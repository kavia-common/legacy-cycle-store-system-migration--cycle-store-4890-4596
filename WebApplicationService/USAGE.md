# WebApplicationService Frontend

This Next.js app provides a responsive, accessible UI with role-based navigation and JWT auth via the API Gateway.

- Auth endpoints: /api/auth/login, /api/auth/logout, /api/user/profile
- Business endpoints used: /api/inventory (GET), /api/orders (POST), /api/support/ticket (POST), /api/training/materials (GET)
- Monitoring hooks: client-side analytics/error reporting (example pattern)

## Run locally

1. Copy .env.example to .env and set:
   - NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
2. Install deps and start:
   - npm install
   - npm run dev

## RBAC

- The navigation and page guards filter by roles:
  - admin: all modules, reports
  - staff: inventory, sales, training
  - support: support, training
  - trainer: training
  - customer: training

## Accessibility

- Keyboard-friendly navigation, visible focus
- Proper ARIA roles/labels and live regions
- WCAG 2.1 color contrast via default palette

## Extensibility

- Add pages in `src/app/*`
- Use `ProtectedRoute` to enforce RBAC
- Use `apiClient` to call the gateway with JWT
- Update navigation in `AppShell.tsx`
