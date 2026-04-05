# Web App

This is the current `Node.js + TypeScript` application for the repository.

## Start

```powershell
npm.cmd install
Copy-Item .env.example .env
npm.cmd run dev
```

## Files

- `src/index.ts`: app entry point
- `src/server.ts`: top page and API scaffold
- `src/server.test.ts`: sample route tests

## Starter Routes

- `/`: starter landing page
- `/api/health`: sample JSON API for health checks
