# File Reference & Quick Links

## Root Level

| File | Purpose |
|------|---------|
| [README.md](README.md) | Project overview, features, quick start |
| [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) | Detailed deliverables checklist & status |
| [TESTING.md](TESTING.md) | Testing guide & smoke tests |
| [package.json](package.json) | Monorepo npm workspaces config |
| [.gitignore](.gitignore) | Git ignore patterns |

## Backend (Node.js + Express)

| File | Purpose |
|------|---------|
| [backend/README.md](backend/README.md) | API endpoints, setup, environment |
| [backend/package.json](backend/package.json) | Dependencies: express, stellar-sdk, etc. |
| [backend/.env.example](backend/.env.example) | Environment template |
| [backend/src/index.js](backend/src/index.js) | Express server, all routes (auth, wallet, tx) |
| [backend/src/store.js](backend/src/store.js) | In-memory database (Maps) |
| [backend/scripts/setupThresholdAccount.js](backend/scripts/setupThresholdAccount.js) | Example: add signers to threshold account |

## Core (Shared Library)

| File | Purpose |
|------|---------|
| [core/README.md](core/README.md) | Package overview & exports |
| [core/package.json](core/package.json) | Dependencies: stellar-sdk, axios, eventemitter3 |
| [core/src/index.js](core/src/index.js) | Module exports |
| [core/src/wallet.js](core/src/wallet.js) | Horizon queries, tx building, SEP-10/7 |
| [core/src/threshold.js](core/src/threshold.js) | Approval weight calculations |
| [core/src/utils.js](core/src/utils.js) | Validation & formatting helpers |
| [core/src/notifications.js](core/src/notifications.js) | Event emitter for UI notifications |
| [core/src/sorobanRules.example.js](core/src/sorobanRules.example.js) | Pseudocode for smart contract rules |

## Web (React + Vite)

| File | Purpose |
|------|---------|
| [web/README.md](web/README.md) | Frontend setup & development |
| [web/package.json](web/package.json) | Dependencies: react, vite, router, qrcode |
| [web/.env.example](web/.env.example) | Environment template |
| [web/index.html](web/index.html) | HTML entry point |
| [web/vite.config.js](web/vite.config.js) | Vite configuration |
| [web/src/main.jsx](web/src/main.jsx) | React entry, router setup |
| [web/src/App.jsx](web/src/App.jsx) | Main layout, routes, sidebar |
| [web/src/pages/Login.jsx](web/src/pages/Login.jsx) | Signup/login with invites |
| [web/src/pages/Dashboard.jsx](web/src/pages/Dashboard.jsx) | Balance display, Freighter connect |
| [web/src/pages/TransactionForm.jsx](web/src/pages/TransactionForm.jsx) | Create & propose transaction |
| [web/src/pages/Pending.jsx](web/src/pages/Pending.jsx) | List & approve pending txs |
| [web/src/pages/History.jsx](web/src/pages/History.jsx) | Placeholder for tx history |
| [web/src/pages/Wallet.jsx](web/src/pages/Wallet.jsx) | View signers & thresholds |
| [web/src/pages/Rules.jsx](web/src/pages/Rules.jsx) | Smart contract rules info |
| [web/src/components/Notifications.jsx](web/src/components/Notifications.jsx) | Global notification toasts |
| [web/src/services/api.js](web/src/services/api.js) | Axios client + auth interceptor |
| [web/src/services/wallet.js](web/src/services/wallet.js) | Freighter integration |

## Desktop (Electron)

| File | Purpose |
|------|---------|
| [desktop/README.md](desktop/README.md) | Desktop build & run instructions |
| [desktop/package.json](desktop/package.json) | Dependencies: electron |
| [desktop/main.js](desktop/main.js) | Electron main process, window creation |

## Mobile (Expo React Native)

| File | Purpose |
|------|---------|
| [mobile/package.json](mobile/package.json) | Dependencies: expo, react-native |
| [mobile/app.json](mobile/app.json) | Expo app config (name, version, etc.) |
| [mobile/metro.config.js](mobile/metro.config.js) | Metro bundler config (monorepo support) |
| [mobile/App.js](mobile/App.js) | Expo entry, login, wallet views |

## Documentation

| File | Purpose |
|------|---------|
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | System design, folders, security model |
| [docs/SETUP_RUN.md](docs/SETUP_RUN.md) | Detailed setup & run guide |
| [docs/INVITE_FLOW.md](docs/INVITE_FLOW.md) | Invite & authentication flow |
| [docs/SOROBAN_RULES.md](docs/SOROBAN_RULES.md) | Smart contract pseudocode & integration |

## Environment Variables

### Backend (.env)
```
PORT=4000
HORIZON_URL=https://horizon-testnet.stellar.org
JWT_SECRET=your-secret-key
NODE_ENV=development
```

### Web (.env)
```
VITE_API_URL=http://localhost:4000
VITE_NETWORK=TESTNET
```

## Dependency Tree

```
backend/
├── express (HTTP server)
├── stellar-sdk (Horizon, Keypair, TransactionBuilder, etc.)
├── bcryptjs (password hashing)
├── jsonwebtoken (JWT auth)
├── nanoid (invite code generation)
└── cors, body-parser, cookie-parser (middleware)

core/
├── stellar-sdk (wallet ops)
├── axios (HTTP requests)
└── eventemitter3 (notifications)

web/
├── react, react-dom (UI)
├── react-router-dom (routing)
├── qrcode.react (QR code display)
├── axios (HTTP)
└── @thresho/core (shared logic)

desktop/
└── electron (desktop wrapper)

mobile/
├── expo (framework)
├── react-native (mobile UI)
└── @thresho/core (shared logic)
```

## Key Endpoints (Backend API)

```
POST   /auth/create-invite          Create invite code
POST   /auth/signup                 Sign up with invite
POST   /auth/login                  Log in with credentials
GET    /me                          Get current user
GET    /wallet/{pubKey}/balances    Get balances & thresholds
POST   /tx/propose                  Propose transaction
GET    /tx/pending                  List pending transactions
GET    /tx/{id}                     Get transaction details
POST   /tx/{id}/approve             Submit signed XDR
POST   /tx/{id}/reject              Reject transaction
```

## Core Module Exports

```javascript
import {
  wallet,           // getBalances, buildPaymentTx, buildSep7UrlForTx, etc.
  threshold,        // hasReachedThreshold, summarizeApprovals, etc.
  utils,            // isValidPublicKey, formatAmount, shortKey, etc.
  notifications,    // EventEmitter: .success(), .error(), .info()
  sorobanRules      // checkLimits, auditSummary, precheckApprovals
} from '@thresho/core';
```

## Quick Commands

```bash
# Install all dependencies (from root)
npm install

# Start backend
npm run dev-backend

# Start web
npm run dev-web

# Start desktop (requires web running)
cd desktop && npm run dev

# Start mobile
cd mobile && npm start

# Build web for production
npm run build-web
```

## Testing Entry Points

- **Backend smoke test**: [TESTING.md#1](TESTING.md#1-backend-api-testing)
- **Core package test**: [TESTING.md#2](TESTING.md#2-core-package-testing)
- **Web app flow**: [TESTING.md#3](TESTING.md#3-web-app-testing)
- **Threshold account setup**: [TESTING.md#6](TESTING.md#6-threshold-account-setup)
- **Multi-sig approval flow**: [TESTING.md#7](TESTING.md#7-multi-signature-approval-flow-full-integration-test)

## Feature Checklists

### Wallet Operations
- [x] Query balances via Horizon
- [x] Build unsigned transactions
- [x] Generate SEP-7 links
- [x] Add signers to account
- [x] Read thresholds & signers

### Transaction Flow
- [x] Propose transaction
- [x] Store XDR pending approval
- [x] Collect signatures
- [x] Verify threshold
- [x] Auto-submit when ready

### Authentication
- [x] Invite code generation
- [x] Signup with credentials
- [x] Login with JWT
- [x] Protected endpoints

### UI Components
- [x] Login/signup page
- [x] Dashboard with balances
- [x] Transaction form
- [x] Pending list with approve
- [x] Wallet info viewer
- [x] Global notifications
- [x] QR code display

### Multi-Platform
- [x] Web (React)
- [x] Desktop (Electron)
- [x] Mobile (Expo RN)
- [x] SEP-7 & Freighter integration
- [x] Shared core library

---

**All files are ready for development and deployment. See [TESTING.md](TESTING.md) to begin.**
