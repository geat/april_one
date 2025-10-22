# 🚀 Ollama Setup Guide for Taskmaster AI

## ⚠️ Status: Belum Terinstall

Anda perlu install Ollama dulu sebelum bisa menggunakan Taskmaster dengan gratis.

## 📋 Step-by-Step Setup:

### Step 1: Install Ollama

#### **Windows (Recommended):**
```bash
# Download installer dari website resmi
# https://ollama.ai/download/windows

# Atau gunakan winget:
winget install Ollama.Ollama
```

#### **macOS:**
```bash
# Download installer atau gunakan Homebrew:
brew install ollama
```

#### **Linux:**
```bash
# Install dengan script resmi:
curl -fsSL https://ollama.ai/install.sh | sh
```

### Step 2: Start Ollama Server

#### **Windows:**
```bash
# Start setelah install
ollama serve

# Atau start dari Start Menu > Ollama
```

#### **macOS/Linux:**
```bash
# Start service
ollama serve &
```

### Step 3: Download Model Gratis

```bash
# Model utama (2GB RAM, cepat)
ollama pull llama3.2:3b

# Model riset (5GB RAM, lebih capable)
ollama pull qwen2.5:7b
```

### Step 4: Verifikasi Install

```bash
# Cek Ollama status
curl http://localhost:11434/api/tags

# Test model
ollama run llama3.2:3b "Hello, introduce yourself"
```

## 🔧 Quick Commands (Copy-Paste)

```bash
# 1. Install Ollama (Windows PowerShell)
winget install Ollama.Ollama

# 2. Start Ollama
ollama serve

# 3. Download models (di terminal baru)
ollama pull llama3.2:3b
ollama pull qwen2.5:7b

# 4. Test Taskmaster
npx task-master-ai status
```

## 📊 Resource Requirements

| Model | RAM | Storage | Speed |
|-------|-----|---------|-------|
| llama3.2:3b | 2GB | 2GB | ⚡⚡⚡⚡ |
| qwen2.5:7b | 5GB | 4GB | ⚡⚡⚡ |

## ✅ Setup Checklist

- [ ] Install Ollama
- [ ] Start Ollama server
- [ ] Download llama3.2:3b
- [ ] Download qwen2.5:7b (opsional)
- [ ] Test dengan `curl http://localhost:11434/api/tags`
- [ ] Test Taskmaster dengan `npx task-master-ai status`

## 🎯 Current Configuration

Setelah Ollama jalan, Anda akan punya:
- **Main**: llama3.2:3b (gratis, cepat)
- **Research**: qwen2.5:7b (gratis, capable)
- **Fallback**: gpt-4o-mini (murah, $1-5/bulan)

## 💡 Tips

1. **Start Ollama otomatis**: Add ke startup programs
2. **Model caching**: Model pertama kali download lambat, tapi setelah itu cepat
3. **Resource monitor**: Cek RAM usage di Task Manager
4. **Troubleshooting**: Restart Ollama jika error

---

**Status saat ini**: ⏳ Menunggu Ollama installation
**Next step**: Install Ollama dan download models