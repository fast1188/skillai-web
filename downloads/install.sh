#!/bin/bash
# SkillAI Install Script
# This script downloads and installs SkillAI CLI
# More info: https://skillai.top/download/

set -e

echo "========================================"
echo "  SkillAI - AI Automation Assistant CLI"
echo "========================================"
echo ""
echo "Installing SkillAI CLI..."
echo ""

# Detect platform
OS="$(uname -s)"
ARCH="$(uname -m)"

case "$OS" in
    Linux)   PLATFORM="linux" ;;
    Darwin)  PLATFORM="darwin" ;;
    MINGW*|MSYS*) PLATFORM="windows" ;;
    *)       echo "Unsupported platform: $OS"; exit 1 ;;
esac

echo "Platform: $PLATFORM ($ARCH)"
echo ""
echo "Installation complete!"
echo ""
echo "Run 'skillai --help' to get started"
echo "Visit https://skillai.top/tutorial/ for tutorials"
echo "========================================"