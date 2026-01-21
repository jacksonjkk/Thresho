# Setup & Run Guide

## Prerequisites
- Node.js 18+
- npm 9+
- Freighter extension (for Web)
- Expo Go app (for Mobile)

## Backend Setup

```bash
cd backend
npm install
PORT=4000 npm run dev
# Or just: npm run dev (if port 4000 is available)
```

Server runs on http://localhost:4000.

Endpoints (partial list):
- POST /auth/create-invite → { code }
- POST /auth/signup → { username, password, inviteCode }
- POST /auth/login → { token, username }
- GET /me (with auth)
- GET /wallet/:pubKey/balances (with auth)
- POST /tx/propose (with auth) → pending transaction
- GET /tx/pending (with auth)
- POST /tx/:id/approve (with auth) → submit signed XDR

## Core Package

Used by Web, Desktop, and Mobile. Already installed.

```bash
cd core
npm list
# Check exports in src/index.js
```

## Web Frontend

```bash
cd web
npm install
npm run dev
# Runs on http://localhost:5173
```

Then:
1. Navigate to http://localhost:5173/login
2. Click "Generate Invite"
3. Sign up with invite code
4. Connect Freighter wallet (Dashboard → "Connect Wallet")
5. View balances, create transactions

## Desktop App

Requires Web to be running first (dev mode).

```bash
cd web
npm run dev

# In another terminal:
cd desktop
npm install
npm run dev
```

Electron will open. It loads React from http://localhost:5173.

## Mobile App (Expo)

```bash
cd mobile
npm install
npm start
# Opens Expo CLI; scan QR with Expo Go
```

Features:
- Login
- Propose transactions
- Open Freighter/wallet via SEP-7 deep link for signing

## Example: 3-Signer Threshold Setup

See `scripts/setupThresholdAccount.js` in backend directory (pseudocode). Real setup requires:

1. Create a Stellar testnet account (via Friendbot or funded account)
2. Use stellar-sdk to add 2 more signers
3. Set thresholds: low=1, med=2, high=3

```javascript
// Pseudocode (real implementation in backend/scripts/setupThresholdAccount.js)
const source = await server.loadAccount(masterPublicKey);
const tx = new TransactionBuilder(source, { fee: '200', networkPassphrase: Networks.TESTNET })
  .addOperation(Operation.setOptions({ signer: { ed25519PublicKey: signer2, weight: 1 } }))
  .addOperation(Operation.setOptions({ signer: { ed25519PublicKey: signer3, weight: 1 } }))
  .addOperation(Operation.setOptions({ masterWeight: 1, lowThreshold: 1, medThreshold: 2, highThreshold: 3 }))
  .setTimeout(180)
  .build();

// Sign with master key and submit via Horizon
```

## Workflow: Propose → Approve → Submit

1. Alice proposes a 5 XLM payment from account ABC to account XYZ
2. Backend creates pending transaction, stores XDR
3. Bob opens Pending page, sees transaction, clicks "Approve"
4. Bob's Freighter signs XDR, sends signed envelope to backend
5. Backend verifies Bob's weight, now has total weight=2 (med threshold)
6. Backend automatically submits transaction to Horizon
7. All see "submitted" status

## Testing Quick Commands

```bash
# Create invite
curl -X POST http://localhost:4000/auth/create-invite

# Signup
curl -X POST http://localhost:4000/auth/signup \
  -H 'Content-Type: application/json' \
  -d '{"username":"alice","password":"pwd123","inviteCode":"XXXXX"}'

# Login
curl -X POST http://localhost:4000/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"username":"alice","password":"pwd123"}'
# Response: { token: "eyJ...", username: "alice" }

# Use token in subsequent requests
TOKEN="eyJ..."
curl -H "Authorization: Bearer $TOKEN" http://localhost:4000/me
```

## Troubleshooting

- **Port 4000 in use**: Run `lsof -i :4000` to find the process, or use `PORT=4001 npm run dev`
- **CORS issues**: Check backend CORS config in src/index.js
- **Freighter not detected**: Install Freighter extension, refresh page
- **Stellar network errors**: Ensure HORIZON_URL is set correctly (testnet by default)
- **Mobile: Cannot connect to localhost:4000**: Use your machine's IP address (e.g., http://192.168.x.x:4000)
