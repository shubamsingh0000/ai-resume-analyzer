# AI Resume Analyzer

A full-stack resume intelligence app with JWT auth, PDF/DOCX upload, ATS-style scoring, history, reports and an OpenAI-compatible analyzer with a deterministic fallback when no key is configured.

## Quick start
1. `npm run install:all`
2. Copy `server/.env.example` to `server/.env` and set `MONGO_URI` (or use the in-memory fallback).
3. `npm run dev` (client on 5173, API on 5000).

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) and [docs/API.md](docs/API.md).
