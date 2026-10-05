# PVault Web

PVault is a React single-page application built with Vite. It connects to the PVault API for account access, credential storage, and account activity.

## Local development

Requirements: Node.js 22.12 or newer and pnpm 11.25.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Set `VITE_API_BASE_URL` in an ignored local env file such as `.env.local` to the API base URL ending in `/api/v1`. The app does not choose an API host automatically.

## Production build

```sh
pnpm run lint
pnpm run build
pnpm run preview
```

Set `VITE_API_BASE_URL` to the main API base URL before building. This value is compiled into browser code, so it must be a public URL, never a secret or private credential.

## Deploy to Vercel

1. Import this repository into Vercel. The project uses Vite, Node.js 22.12+, and pnpm 11.25.
2. Set `VITE_API_BASE_URL` in **Project Settings → Environment Variables** to the API URL ending in `/api/v1`. Add it for Production and Preview as needed.
3. Deploy. `vercel.json` configures the Vite build, `dist` output, client-side route fallback, asset caching, and baseline security headers.

Vercel builds reject a missing API URL, non-HTTPS URLs, and URLs without `/api/v1`. The configured main API may be used for both production and preview deployments. The API must allow browser requests from the Vercel deployment and custom domain through its CORS policy; configure that on the API host.