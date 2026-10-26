# PROTOCOL.md - Urja Meter Ops Reverse-Engineering Write-Up

## Authentication Mechanism
- The legacy portal uses cookie-based session tracking.
- When an operator logs in via `POST /login` with credentials (`operator@urja.local` / `urja-ops-2026`), the server sets a secure session cookie named `__Secure-auth.session-token`.
- Subsequent requests rely on this cookie to maintain an authenticated state.

## Discovered Internal Endpoints
- **Energy Data:** `/portal/meters/{id}/energy` — Fetches historical energy consumption details for a specified meter ID.
- **Portal Core:** Internal JSON endpoints are utilized by the frontend dashboard rather than heavy server-rendered templates.