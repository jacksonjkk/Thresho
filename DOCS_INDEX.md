# 📖 Documentation Index

Start here to understand and use the Threshold Wallet project.

---

## 🚀 Getting Started (Pick Your Path)

### **I want to start in 60 seconds**
→ [QUICKSTART.md](QUICKSTART.md)

### **I want to understand the architecture**
→ [ARCHITECTURE.md](docs/ARCHITECTURE.md)

### **I want to deploy/configure everything**
→ [SETUP_RUN.md](docs/SETUP_RUN.md)

### **I want to test all features**
→ [TESTING.md](TESTING.md)

### **I want to see the project status**
→ [STATUS.md](STATUS.md)

---

## 📚 Documentation by Topic

### Authentication & Onboarding
- [INVITE_FLOW.md](docs/INVITE_FLOW.md) — How invites work, signup/login flow

### System Design
- [ARCHITECTURE.md](docs/ARCHITECTURE.md) — High-level system, folders, security
- [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) — Feature checklist & deliverables

### Smart Contracts
- [SOROBAN_RULES.md](docs/SOROBAN_RULES.md) — Pseudocode for transaction rules

### Setup & Deployment
- [SETUP_RUN.md](docs/SETUP_RUN.md) — Environment variables, ports, endpoints
- [QUICKSTART.md](QUICKSTART.md) — Quick 60-second start

### Testing & Verification
- [TESTING.md](TESTING.md) — Smoke tests, integration tests, flow tests

### Reference
- [FILE_REFERENCE.md](FILE_REFERENCE.md) — Complete file guide with purposes
- [STATUS.md](STATUS.md) — Project completion status

### Module-Specific
- [backend/README.md](backend/README.md) — API endpoints, auth, database
- [core/README.md](core/README.md) — Shared library exports & usage
- [web/README.md](web/README.md) — Frontend setup & development
- [desktop/README.md](desktop/README.md) — Electron build & deployment
- [ROOT README.md](README.md) — Project overview & features

---

## 🎯 Common Tasks

### Set up the project
1. [QUICKSTART.md](QUICKSTART.md) — Follow 60-second guide

### Run locally (dev)
1. [SETUP_RUN.md](docs/SETUP_RUN.md#backend-setup) — Backend
2. [SETUP_RUN.md](docs/SETUP_RUN.md#web-frontend) — Web
3. Optional: [SETUP_RUN.md](docs/SETUP_RUN.md#desktop-app) — Desktop
4. Optional: [SETUP_RUN.md](docs/SETUP_RUN.md#mobile-app-expo) — Mobile

### Test a specific feature
→ [TESTING.md](TESTING.md) — Find the test for your feature

### Understand how transactions work
→ [SETUP_RUN.md](docs/SETUP_RUN.md#workflow-propose--approve--submit) — Workflow

### Create a threshold account
→ [SETUP_RUN.md](docs/SETUP_RUN.md#example-3-signer-threshold-setup) — Step-by-step

### Deploy to production
→ [SETUP_RUN.md](docs/SETUP_RUN.md#troubleshooting) → follow "Next Steps"

### Find a specific file's purpose
→ [FILE_REFERENCE.md](FILE_REFERENCE.md) — Full file breakdown

### Understand security
→ [ARCHITECTURE.md](docs/ARCHITECTURE.md#security-model) — Security section

### Learn about smart contract rules
→ [SOROBAN_RULES.md](docs/SOROBAN_RULES.md) — Rules & integration

---

## 📋 Documentation Map

```
Thresho/
├── README.md                    ← Project overview
├── QUICKSTART.md                ← 60-second start
├── STATUS.md                    ← Completion status
├── TESTING.md                   ← Smoke tests & verification
├── FILE_REFERENCE.md            ← File-by-file guide
├── PROJECT_SUMMARY.md           ← Feature checklist
├── docs/
│   ├── ARCHITECTURE.md          ← System design & security
│   ├── SETUP_RUN.md             ← Detailed setup & environment
│   ├── SOROBAN_RULES.md         ← Smart contract pseudocode
│   └── INVITE_FLOW.md           ← Auth & onboarding
├── backend/
│   └── README.md                ← API endpoints & setup
├── core/
│   └── README.md                ← Shared library exports
├── web/
│   └── (no specific README yet)
├── desktop/
│   └── README.md                ← Electron build
└── mobile/
    └── (no specific README yet)
```

---

## 🔍 Quick Reference

### Key Concepts
- **Threshold Wallet**: Multiple signers, each with a weight. Transactions require minimum total weight.
- **SEP-7**: Stellar Envelope Proposal. Deep-linkable signing for wallets.
- **Horizon**: Stellar's REST API for querying accounts and submitting transactions.
- **Freighter**: Browser extension for Stellar signing.
- **Soroban**: Stellar's smart contract platform (optional for rule enforcement).

### Key Endpoints
- `POST /auth/create-invite` → Generate invite code
- `POST /auth/signup` → Sign up with invite
- `POST /auth/login` → Log in with JWT
- `GET /wallet/{pubKey}/balances` → Query balances
- `POST /tx/propose` → Create pending transaction
- `GET /tx/pending` → List pending transactions
- `POST /tx/:id/approve` → Submit signed XDR
- Full list: [FILE_REFERENCE.md](FILE_REFERENCE.md)

### Key Commands
```bash
# Backend
npm --prefix backend run dev

# Web
npm --prefix web run dev

# Desktop
npm --prefix desktop run dev

# Mobile
npm --prefix mobile start

# All at root (if using workspaces)
npm run dev-backend
npm run dev-web
```

---

## 📞 Support

- **Setup issues?** → [SETUP_RUN.md](docs/SETUP_RUN.md#troubleshooting)
- **Testing problems?** → [TESTING.md](TESTING.md#troubleshooting)
- **File not found?** → [FILE_REFERENCE.md](FILE_REFERENCE.md)
- **Need overview?** → [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)
- **Want to understand design?** → [ARCHITECTURE.md](docs/ARCHITECTURE.md)

---

## ✅ Checklist to Get Started

- [ ] Read [QUICKSTART.md](QUICKSTART.md)
- [ ] Install backend & run: `npm --prefix backend run dev`
- [ ] Install web & run: `npm --prefix web run dev`
- [ ] Open http://localhost:5173
- [ ] Create invite, sign up, log in
- [ ] Connect wallet (Freighter)
- [ ] Propose transaction
- [ ] Explore other pages

---

**Now pick where you want to go and dive in! 🚀**
