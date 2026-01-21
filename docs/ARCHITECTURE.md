# Architecture Overview

- core/: shared wallet ops, thresholds, utils, notifications. No secrets.
- backend/: Express API for auth, invites, pending transaction orchestration; collects signed XDRs and submits when threshold met.
- web/: React app with Freighter integration for signing.
- desktop/: Electron wrapper around web.
- mobile/: Expo RN app using SEP-7 deep links to external wallets for signing.

Security:
- App credentials (JWT) separate from blockchain keys.
- No private keys stored server-side; server only relays signed envelopes.
- Thresholds enforced on-chain; server checks weights from Horizon.
- Optional Soroban contract provides audit-friendly rules.
