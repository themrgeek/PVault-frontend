# PVault Web

PVault is a React single-page application built with Vite. It connects to the PVault API for account access, credential storage, and account activity.

## Local development

Requirements: Node.js 22.12 or newer and pnpm 11.25.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Local development defaults to the documented staging API. To use another API, set `VITE_API_BASE_URL` in an ignored local env file such as `.env.local`. The value must be the API base URL ending in `/api/v1`.

## Production build

```sh
pnpm run lint
pnpm run build
pnpm run preview
```

Production builds do not fall back to staging. Set `VITE_API_BASE_URL` to the deployed API base URL before building. This value is compiled into browser code, so it must be a public URL, never a secret or private credential.

## Deploy to Netlify

1. Import this repository into Netlify.
2. Set `VITE_API_BASE_URL` in **Site configuration → Environment variables** to the production API URL ending in `/api/v1`.
3. Use the production deploy context for the production API. The build check rejects a missing URL, non-HTTPS URLs, URLs without `/api/v1`, and the documented staging API in production.
4. Deploy. `netlify.toml` configures Node 22, `pnpm run build`, the `dist` publish directory, SPA route fallback, asset caching, and baseline security headers.

The API must allow browser requests from the deployed Netlify site and custom domain through its CORS policy. Configure that on the API host; this frontend cannot change backend CORS rules.