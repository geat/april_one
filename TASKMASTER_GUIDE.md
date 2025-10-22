# Taskmaster AI Configuration Guide

Proyek ini sudah dikonfigurasi dengan Taskmaster AI untuk manajemen tugas yang lebih efisien.

## Lokasi Konfigurasi

- **Konfigurasi Utama**: `.taskmaster/config.json`
- **Dokumentasi**: `TASKMASTER_GUIDE.md`
- **Konfigurasi Legacy**: `taskmaster.config.json` (backup)

## Struktur Direktori Taskmaster

```
.taskmaster/
├── config.json    # Konfigurasi utama (models, workflows, project context)
├── tasks/         # File task yang sedang dikerjakan
├── contexts/      # Context dan informasi proyek
├── memories/      # Memori jangka panjang AI
├── summaries/     # Ringkasan progres
└── logs/          # Log aktivitas
```

## Perintah yang Tersedia

### Development Commands
- `npm run dev` - Start development server dengan Turbopack
- `npm run build` - Build production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Database Commands
- `npm run db:generate` - Generate Drizzle migrations
- `npm run db:migrate` - Apply database migrations
- `npm run db:studio` - Open Drizzle Studio

### Taskmaster Custom Commands
- `check-all` - Run semua checks (lint, type check, build)
- `setup-dev` - Setup development environment
- `dev-full` - Start dev server + database studio (parallel)

## Template Task

### Feature Development
1. Research and requirements analysis
2. Design architecture and components
3. Implement core functionality
4. Write tests
5. Documentation and deployment

### Bug Fix
1. Identify and reproduce the bug
2. Analyze root cause
3. Implement fix
4. Test the fix
5. Update documentation if needed

### Refactoring
1. Analyze current code structure
2. Plan refactoring approach
3. Implement changes
4. Run tests to ensure no regression
5. Update documentation

## Teknologi yang Digunakan

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL dengan Drizzle ORM
- **Authentication**: Better Auth
- **UI Components**: Radix UI primitives
- **Forms**: React Hook Form dengan Zod validation
- **Development**: Turbopack untuk fast refresh

## Konfigurasi AI

### Models yang Tersedia
- **Main Model**: Claude 3.5 Sonnet (untuk task utama)
- **Research Model**: Perplexity Sonar Pro (untuk riset)
- **Fallback Model**: Claude 3.5 Sonnet (backup)

### Project Context
AI sudah dikonfigurasi dengan context lengkap tentang:
- Next.js 15 dengan React 19 dan TypeScript
- Tailwind CSS dengan custom components
- PostgreSQL dengan Drizzle ORM
- Better Auth untuk authentication
- Radix UI primitives
- React Hook Form dengan Zod validation
- Turbopack untuk fast development

## Cara Penggunaan Taskmaster

Taskmaster AI sekarang sudah terintegrasi dengan Claude Code. Gunakan slash commands:

### Basic Commands
- `npx task-master-ai status` - Lihat status proyek
- `npx task-master-ai init` - Inisialisasi task baru
- `npx task-master-ai list` - Lihat semua task

### Advanced Commands
- Gunakan natural language untuk membuat task
- AI akan otomatis memahami konteks proyek Anda
- Task bisa di-breakdown menjadi subtasks otomatis

## Tips Penggunaan

1. **Configuration sudah optimal**: AI sudah dikonfigurasi dengan teknologi stack Anda
2. **Context awareness**: Taskmaster akan otomatis menggunakan informasi proyek
3. **Natural language**: Anda bisa menggunakan bahasa alami untuk membuat task
4. **Integration**: Konfigurasi sudah terintegrasi dengan tools development Anda

## Quick Start

1. Install dependencies: `npm install`
2. Setup development: `npm run setup-dev`
3. Start development: `npm run dev-full`
4. **Taskmaster sudah siap**: Gunakan `npx task-master-ai` commands

## Status: ✅ Aktif dan Terkonfigurasi

Taskmaster AI sudah berhasil diinstal dan dikonfigurasi dengan:
- ✅ Configuration file ditemukan di `.taskmaster/config.json`
- ✅ Models terkonfigurasi dengan benar
- ✅ Project context sudah disesuaikan
- ✅ Workflows development sudah terintegrasi

Untuk informasi lebih lanjut tentang Taskmaster AI, kunjungi: https://docs.task-master.dev