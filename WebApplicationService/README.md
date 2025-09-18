This is a [Next.js](https://nextjs.org) Web Application for Cycle Store with authentication, RBAC, docs/training, analytics logging, and support ticketing.

## Getting Started

1) Copy environment example and set values:
```bash
cp .env.example .env
# Set:
# NEXT_PUBLIC_API_BASE_URL=https://api.cyclestore.com
# NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

2) Install and run:
```bash
npm install
npm run dev
```

Open http://localhost:3000

## Features
- Authentication (login/logout via API Gateway)
- RBAC-aware navigation and protected routes
- Dashboard, Products (inventory), Support ticketing, Training materials, Docs
- Profile management (view)
- Client-side analytics logging hooks to Monitoring service via API Gateway

## Accessibility
WCAG 2.1 practices: proper landmarks, labels, keyboard focus styles, and contrast-aware theme.

## Configuration
Environment variables are read from NEXT_PUBLIC_* keys. Do not hardcode secrets in code.
