# Threshold Wallet (Multi-Platform) — Stellar Integration

This monorepo contains a full, multi-platform threshold wallet integrated with Stellar.

Targets:
- Web (React + Vite)
- Desktop (Electron wrapper for Web app)
- Mobile (Expo React Native)
- Shared core logic (`core/`) used by all platforms
- Backend (`backend/`) Node.js + Express orchestrating auth, invites, approvals, and Stellar Horizon interactions

Key Features:
- Threshold wallet with example 3 signers, medium threshold = 2
- Propose → approve/reject flow; pending transactions with collected signatures
- Wallet operations: balances, transaction creation, formatting, validation, notifications
- SEP-10 (auth), SEP-6/24 (deposit/withdraw) hooks, Horizon reads
- Never stores private keys; all signing happens in user wallets (Freighter/SEP-7/RN deep links)
- Optional Soroban smart contract rules: transaction limits, categories, time locks, threshold pre-checks

## ⚡ Quick Start (60 seconds)

See [QUICKSTART.md](QUICKSTART.md) for fast setup instructions.

```bash
# Terminal 1
cd backend && npm install && npm run dev

# Terminal 2
cd web && npm install && npm run dev

# Open http://localhost:5173 → Generate invite → Signup → Login ✅
```

## 📚 Documentation

- **[QUICKSTART.md](QUICKSTART.md)** — Get running in 60 seconds
- **[SETUP_RUN.md](docs/SETUP_RUN.md)** — Detailed setup & environment
- **[TESTING.md](TESTING.md)** — Verification & smoke tests
- **[FILE_REFERENCE.md](FILE_REFERENCE.md)** — File-by-file breakdown
- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** — Full feature checklist
- **[ARCHITECTURE.md](docs/ARCHITECTURE.md)** — System design & security
- **[SOROBAN_RULES.md](docs/SOROBAN_RULES.md)** — Smart contract pseudocode
- **[INVITE_FLOW.md](docs/INVITE_FLOW.md)** — Auth & onboarding

## 🏗️ Project Structure

```
Thresho/
├── backend/         # Node.js + Express API
├── core/            # Shared wallet logic (npm package)
├── web/             # React + Vite frontend
├── desktop/         # Electron wrapper
├── mobile/          # Expo React Native
├── docs/            # Architecture, rules, setup
└── README.md
```

## 🔐 Security

- App credentials separate from blockchain keys
- Threshold rules prevent any single signer from moving funds alone
- Smart contract rules are auditable and safe
- Direct wallet access bypass is possible, but threshold rules still apply
- No private keys stored on backend or frontend

## 📦 What's Included

- ✅ Full multi-platform UI (Web, Desktop, Mobile)
- ✅ Backend orchestration with invite flow
- ✅ Shared core library (wallet ops, thresholds, utils)
- ✅ Stellar Horizon integration
- ✅ Freighter & SEP-7 signing
- ✅ Example 3-signer threshold setup
- ✅ Soroban rules pseudocode
- ✅ Comprehensive documentation
- ✅ Testing guide with examples

## 🚀 Platforms

### Web
React + Vite, Freighter integration for signing

### Desktop
Electron wrapper around Web app

### Mobile
Expo React Native, SEP-7 deep links to wallets for signing

### Backend
Node.js + Express, JWT auth, Stellar Horizon integration

## 💡 Example Workflow

1. **Alice** (signer 1) logs in, proposes 5 XLM payment
2. **Backend** creates pending transaction, stores XDR
3. **Bob** (signer 2) logs in, clicks "Approve", signs with Freighter
   - Weight: 1 (< medium threshold 2)
4. **Charlie** (signer 3) logs in, clicks "Approve", signs with Freighter
   - Weight: 1, Total: 2 (≥ medium threshold)
   - **Backend auto-submits** to Horizon
5. All see "submitted" status ✅

## 📋 Features

- Login / Signup with invite flow
- Dashboard with balances & QR code
- Wallet management (signers, thresholds)
- Transaction creation & proposal
- Pending approvals (collect signatures)
- Transaction history
- Smart contract rules (optional)
- Multi-platform support (Web, Desktop, Mobile)
- Stellar Horizon integration
- SEP-10 auth hooks
- SEP-6/24 deposit/withdraw hooks
- Global notifications

## 🛠️ Development

Each platform is independently runnable:

```bash
# Backend
cd backend && npm install && npm run dev

# Web
cd web && npm install && npm run dev

# Desktop (requires web running)
cd desktop && npm install && npm run dev

# Mobile
cd mobile && npm install && npm start
```

## 📄 License

For evaluation/testing. Replace with your chosen license.

---

**Ready to start?** → [QUICKSTART.md](QUICKSTART.md)




**Soroban smart contract rules**, implementing:
       1. Transaction Rules / Limits (max amount, spending categories, time locks)
       2. Auditable & Safe Logic (small, readable, easy to verify)
       3. Threshold Wallet Integration (pre-check approvals, validate signatures)
