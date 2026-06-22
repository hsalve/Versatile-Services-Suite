---
name: Vite config env var guards
description: PORT and BASE_PATH must use fallbacks, not throw, in vite.config.ts — deployment build runs without these vars
---

**Rule:** In `artifacts/versatile-hr/vite.config.ts`, never throw if `PORT` or `BASE_PATH` are missing. Use fallbacks.

```ts
// CORRECT
const port = Number(process.env.PORT ?? "3000");
const basePath = process.env.BASE_PATH ?? "/";

// WRONG — breaks production build
if (!rawPort) throw new Error("PORT environment variable is required...");
```

**Why:** Replit's deployment build step runs `vite build` without injecting workflow-specific env vars (`PORT`, `BASE_PATH`). Those are only available at dev/preview runtime. The build crashes before Vite can bundle anything.

**How to apply:** Any time vite.config.ts is modified or regenerated, ensure PORT and BASE_PATH use `?? fallback` syntax, not hard guards.
