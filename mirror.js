const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");

const OUT = path.resolve("original_site");
const BASE = "https://ai.160.com";

function downloadFile(url, filepath) {
  return new Promise((resolve) => {
    try {
      const proto = url.startsWith("https") ? https : http;
      const req = proto.get(url, { timeout: 10000, headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          const loc = res.headers.location;
          downloadFile(loc.startsWith("http") ? loc : new URL(loc, new URL(url).origin).href, filepath).then(resolve);
          return;
        }
        if (res.statusCode !== 200) { resolve(false); return; }
        const dir = path.dirname(filepath);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        const file = fs.createWriteStream(filepath);
        res.pipe(file);
        file.on("finish", () => { file.close(); resolve(true); });
        file.on("error", () => resolve(false));
      });
      req.on("error", () => resolve(false));
      req.on("timeout", () => { req.destroy(); resolve(false); });
    } catch(e) { resolve(false); }
  });
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36"
  });
  const page = await context.newPage();
  
  const resources = new Map();
  
  page.on("response", async (resp) => {
    const url = resp.url();
    const ct = resp.headers()["content-type"] || "";
    if (url.match(/\.(js|css|png|jpg|jpeg|svg|ico|webp|woff|woff2|ttf|eot|gif|json|xml|txt)(\?|$)/i) ||
        ct.includes("javascript") || ct.includes("css") || ct.includes("font") || ct.includes("image")) {
      try {
        const body = await resp.body();
        const u = new URL(url);
        resources.set(url, { path: u.pathname, body: body, ct: ct });
      } catch(e) {}
    }
  });

  console.log("Loading", BASE, "...");
  try {
    await page.goto(BASE, { waitUntil: "networkidle", timeout: 60000 });
    await page.waitForTimeout(4000);
  } catch(e) {
    console.log("Page load warning:", e.message);
  }

  // Save HTML
  const html = await page.content();
  const htmlPath = path.join(OUT, "index.html");
  fs.writeFileSync(htmlPath, html, "utf8");
  console.log("HTML saved:", html.length, "chars");

  // Save all resources
  console.log("Saving", resources.size, "resources...");
  let saved = 0;
  for (const [url, data] of resources) {
    const fp = path.join(OUT, data.path.replace(/^\//, ""));
    if (fp.endsWith("/")) continue;
    try {
      const dir = path.dirname(fp);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(fp, data.body);
      saved++;
    } catch(e) {}
  }
  console.log("Saved:", saved, "files");

  await browser.close();
  console.log("Done!");
})();
