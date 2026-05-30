// token.skillai.top API Proxy — Cloudflare Worker
// 用户通过此 Worker 调用 DeepSeek/通义等 AI 模型

// 支持的模型列表及其 API 地址
const PROVIDERS = {
  deepseek: {
    base: 'https://api.deepseek.com',
    models: ['deepseek-chat', 'deepseek-reasoner', 'deepseek-v4-flash', 'deepseek-v4-pro']
  },
  tongyi: {
    base: 'https://dashscope.aliyuncs.com/api/v1',
    models: ['qwen-turbo', 'qwen-plus', 'qwen-max']
  },
  doubao: {
    base: 'https://ark.cn-beijing.volces.com/api/v3',
    models: ['doubao-pro-32k', 'doubao-pro-128k']
  },
  zhipu: {
    base: 'https://open.bigmodel.cn/api/paas/v4',
    models: ['glm-4-plus', 'glm-4-air', 'glm-4-flash']
  }
}

// KV 命名空间绑定（用于存储用户余额和 API Keys）
// 需要在 Cloudflare Dashboard 绑定: TOKEN_KV

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    const path = url.pathname
    
    // CORS 头
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
    
    // OPTIONS 预检请求
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders })
    }
    
    // 路由分发
    try {
      if (path === '/v1/chat/completions' || path === '/chat/completions') {
        return await handleChat(request, env, corsHeaders)
      } else if (path === '/v1/models' || path === '/models') {
        return await handleModels(request, corsHeaders)
      } else if (path === '/api/balance') {
        return await handleBalance(request, env, corsHeaders)
      } else if (path === '/api/register') {
        return await handleRegister(request, env, corsHeaders)
      } else if (path.startsWith('/api/admin/')) {
        return await handleAdmin(request, env, corsHeaders)
      } else {
        // 健康检查
        return new Response(JSON.stringify({ 
          status: 'ok',
          message: 'Token Relay Proxy is running',
          docs: 'https://token.skillai.top'
        }), {
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        })
      }
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      })
    }
  }
}

// 处理聊天请求 — 核心转发逻辑
async function handleChat(request, env, headers) {
  const apiKey = request.headers.get('Authorization')?.replace('Bearer ', '')
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'Missing API Key' }), {
      status: 401, headers: { 'Content-Type': 'application/json', ...headers }
    })
  }
  
  // 验证 API Key 并获取用户信息
  const userData = await validateKey(apiKey, env)
  if (!userData) {
    return new Response(JSON.stringify({ error: 'Invalid API Key' }), {
      status: 403, headers: { 'Content-Type': 'application/json', ...headers }
    })
  }
  
  // 检查余额
  if (userData.balance <= 0 && userData.free <= 0) {
    return new Response(JSON.stringify({ error: 'Insufficient balance' }), {
      status: 402, headers: { 'Content-Type': 'application/json', ...headers }
    })
  }
  
  const body = await request.json()
  const model = body.model || ''
  
  // 自动路由到对应厂商
  let provider = null
  let targetModel = model
  
  for (const [name, cfg] of Object.entries(PROVIDERS)) {
    if (cfg.models.some(m => model.includes(m) || m.includes(model))) {
      provider = cfg
      targetModel = model
      break
    }
  }
  
  // 默认走 DeepSeek
  if (!provider) {
    provider = PROVIDERS.deepseek
    targetModel = body.model || 'deepseek-chat'
  }
  
  // 替换用户的 API Key 为中转站的 Key
  const masterKey = await env.TOKEN_KV.get('master_key_deepseek') || ''
  const apiUrl = `${provider.base}/chat/completions`
  
  // 转发请求
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${masterKey}`
    },
    body: JSON.stringify({ ...body, model: targetModel })
  })
  
  // 扣减用户余额（简化版：按次计费）
  await deductBalance(apiKey, env, userData)
  
  // 返回结果
  const result = await response.text()
  return new Response(result, {
    status: response.status,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    }
  })
}

// 获取模型列表
async function handleModels(request, headers) {
  const models = []
  for (const [name, cfg] of Object.entries(PROVIDERS)) {
    for (const m of cfg.models) {
      models.push({ id: m, provider: name, object: 'model' })
    }
  }
  return new Response(JSON.stringify({ data: models }), {
    headers: { 'Content-Type': 'application/json', ...headers }
  })
}

// 查询余额
async function handleBalance(request, env, headers) {
  const apiKey = request.headers.get('Authorization')?.replace('Bearer ', '')
  if (!apiKey) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json', ...headers } })
  
  const userData = await validateKey(apiKey, env)
  if (!userData) return new Response(JSON.stringify({ error: 'Invalid key' }), { status: 403, headers: { 'Content-Type': 'application/json', ...headers } })
  
  return new Response(JSON.stringify({ 
    balance: userData.balance,
    free_used: userData.free_used || 0,
    total_used: userData.total_used || 0
  }), { headers: { 'Content-Type': 'application/json', ...headers } })
}

// 注册新用户
async function handleRegister(request, env, headers) {
  const body = await request.json()
  const userId = 'u_' + Date.now().toString(36) + Math.random().toString(36).slice(2,6)
  const apiKey = 'sk-' + Math.random().toString(36).slice(2,10) + Math.random().toString(36).slice(2,10)
  
  await env.TOKEN_KV.put(apiKey, JSON.stringify({
    user_id: userId,
    balance: 0,
    free: 50,  // 新用户送 50 次
    free_used: 0,
    total_used: 0,
    created_at: Date.now(),
    contact: body.contact || ''
  }))
  
  return new Response(JSON.stringify({ 
    api_key: apiKey,
    free_quota: 50,
    message: '注册成功！赠送 50 次免费使用量',
    endpoint: 'https://token.skillai.top/v1/chat/completions'
  }), { headers: { 'Content-Type': 'application/json', ...headers } })
}

// 管理员接口
async function handleAdmin(request, env, headers) {
  const authKey = request.headers.get('X-Admin-Key')
  const adminKey = await env.TOKEN_KV.get('admin_key') || 'admin123'
  if (authKey !== adminKey) {
    return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403, headers: { 'Content-Type': 'application/json', ...headers } })
  }
  
  const path = new URL(request.url).pathname
  
  if (path === '/api/admin/topup' && request.method === 'POST') {
    const body = await request.json()
    const key = body.api_key
    const amount = body.amount || 0
    
    const data = await env.TOKEN_KV.get(key)
    if (!data) return new Response(JSON.stringify({ error: 'User not found' }), { status: 404, headers: { 'Content-Type': 'application/json', ...headers } })
    
    const user = JSON.parse(data)
    user.balance += amount
    await env.TOKEN_KV.put(key, JSON.stringify(user))
    
    return new Response(JSON.stringify({ success: true, new_balance: user.balance }), {
      headers: { 'Content-Type': 'application/json', ...headers }
    })
  }
  
  if (path === '/api/admin/stats') {
    // 统计（简化版）
    return new Response(JSON.stringify({ message: 'Stats available in dashboard' }), {
      headers: { 'Content-Type': 'application/json', ...headers }
    })
  }
  
  return new Response(JSON.stringify({ error: 'Not found' }), { status: 404, headers: { 'Content-Type': 'application/json', ...headers } })
}

// 验证 API Key
async function validateKey(apiKey, env) {
  try {
    const data = await env.TOKEN_KV.get(apiKey)
    return data ? JSON.parse(data) : null
  } catch {
    return null
  }
}

// 扣减余额
async function deductBalance(apiKey, env, userData) {
  if (userData.free > 0) {
    userData.free--
    userData.free_used = (userData.free_used || 0) + 1
  } else if (userData.balance > 0) {
    userData.balance -= 0.01  // 简化：每次扣 0.01
  }
  userData.total_used = (userData.total_used || 0) + 1
  await env.TOKEN_KV.put(apiKey, JSON.stringify(userData))
}
