# Codex Shared

This repository is organized as a small monorepo:

- `apps/`: user-facing applications
- `services/`: backend services and future Python components
- `contracts/`: shared API and schema definitions
- `docs/`: project documentation
- `scripts/`: repository-level helper scripts

Right now the active app is a minimal `Node.js + TypeScript` starter in `apps/web`.

## Current Structure

```text
codex-shared/
  apps/
    web/
      .env.example
      package.json
      tsconfig.json
      src/
  contracts/
  docs/
  scripts/
  services/
```

## Getting Started

Use the Node app from `apps/web`.

```powershell
Set-Location apps/web
npm.cmd install
Copy-Item .env.example .env
npm.cmd run dev
```

If PowerShell blocks `npm`, continue using `npm.cmd`.

## Web App Commands

Run these from `apps/web`.

- `npm run dev`: start the app in watch mode
- `npm run build`: compile TypeScript into `dist/`
- `npm run start`: run the compiled output
- `npm run typecheck`: run the TypeScript checker
- `npm test`: run the sample test

## Adding Python Later

When you add Python, the recommended path is:

```text
services/
  api/
    pyproject.toml
    app/
    tests/
```

That keeps `Node.js` in `apps/web` and `Python` services in `services/`, so each stack keeps its own dependencies and tooling.

## Development Rules

- Do not commit secrets.
- Keep changes small and focused.
- Run checks before merging.
- Prefer feature branches over direct commits to `main`.
