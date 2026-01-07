# Testing & Verification Guide

## 1. Backend API Testing

### Quick Smoke Test (cURL)

```bash
# Terminal 1: Start backend
cd backend
npm install
PORT=4000 npm run dev
```

```bash
# Terminal 2: Test endpoints

# 1. Create invite
INVITE=$(curl -s -X POST http://localhost:4000/auth/create-invite | jq -r '.code')
echo "Invite: $INVITE"

# 2. Signup
curl -X POST http://localhost:4000/auth/signup \
  -H 'Content-Type: application/json' \
  -d "{\"username\":\"alice\",\"password\":\"pwd123\",\"inviteCode\":\"$INVITE\"}"

# 3. Login
TOKEN=$(curl -s -X POST http://localhost:4000/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"username":"alice","password":"pwd123"}' | jq -r '.token')
echo "Token: $TOKEN"

# 4. Get self
curl -H "Authorization: Bearer $TOKEN" http://localhost:4000/me

# 5. Get balance (requires valid testnet public key)
PUBLIC_KEY="GBUQWP3BOUZX34ULNQG23RQ6F4PFXKXMGYKCG7GNTLQCOMZMJLYXVY7Z"
curl -H "Authorization: Bearer $TOKEN" \
  "http://localhost:4000/wallet/$PUBLIC_KEY/balances"
```

### Postman/Insomnia

Import endpoints:
- `POST /auth/create-invite`
- `POST /auth/signup` (payload: username, password, inviteCode)
- `POST /auth/login` (payload: username, password)
- `GET /me` (header: Authorization: Bearer {token})
- `GET /wallet/{pubKey}/balances` (header: auth)
- `POST /tx/propose` (header: auth, payload: sourcePublicKey, destinationPublicKey, amount, asset, level)
- `GET /tx/pending` (header: auth)
- `GET /tx/{id}` (header: auth)
- `POST /tx/{id}/approve` (header: auth, payload: signedXDR, signerPublicKey)

## 2. Core Package Testing

```bash
cd core
npm list
# Should show @thresho/core with exports: wallet, threshold, utils, notifications, sorobanRules
```

### Manual Check

```javascript
// test.js
import * as Core from './src/index.js';

console.log('Wallet:', Object.keys(Core.wallet));
console.log('Threshold:', Object.keys(Core.threshold));
console.log('Utils:', Object.keys(Core.utils));
console.log('Notifications:', Core.notifications.constructor.name);
console.log('Soroban Rules:', Object.keys(Core.sorobanRules));
```

```bash
node test.js
```

Expected output:
```
Wallet: [ 'getServer', 'getBalances', 'getPayments', ... ]
Threshold: [ 'hasReachedThreshold', 'requiredWeightForLevel', ... ]
Utils: [ 'isValidPublicKey', 'formatAmount', ... ]
Notifications: Notifications
Soroban Rules: [ 'checkLimits', 'auditSummary', 'precheckApprovals' ]
```

## 3. Web App Testing

```bash
# Terminal 1: Backend
PORT=4000 npm run dev

# Terminal 2: Web dev server
cd web
npm install
npm run dev
# Opens http://localhost:5173
```

### Test Flow

1. **Login Page**
   - Click "Generate Invite"
   - Copy invite code
   - Switch to "Sign up"
   - Enter invite, username, password
   - Click "Create account" → "Login"
   - Enter credentials → "Login"

2. **Dashboard**
   - Verify sidebar shows navigation
   - Click "Connect Wallet (Freighter)"
   - *Note: Requires Freighter extension installed + testnet account*
   - Should display: public key, balances, thresholds, QR code

3. **New Transaction**
   - Enter a valid testnet source public key
   - Enter destination public key
   - Enter amount (e.g., 1)
   - Select asset, memo, level, category
   - Click "Submit for Approval"
   - Should show "Transaction proposed" + ID

4. **Pending Transactions**
   - Should list the transaction you just created
   - Click "Connect Freighter for Approval"
   - Click "Approve" → Freighter signs → backend receives signature
   - If threshold met, status → "submitted"

5. **Wallet Management**
   - Enter a valid public key
   - Click "Load"
   - Should display thresholds and signers

## 4. Desktop App Testing

```bash
# Terminal 1: Web dev
cd web && npm run dev

# Terminal 2: Desktop
cd desktop
npm install
npm run dev
```

- Electron window opens
- Loads http://localhost:5173 (web app)
- All web app functionality works
- SEP-7 links open in default browser

## 5. Mobile App Testing

```bash
cd mobile
npm install
npm start
```

- Expo CLI starts
- Scan QR code with Expo Go (iOS/Android)
- App loads
- Login works
- Propose transaction works
- Click "Open in wallet (SEP-7)" opens Freighter/wallet app on phone

## 6. Threshold Account Setup

```bash
# Requires: funded testnet account
# Steps:
# 1. Generate 3 keypairs (e.g., via stellar.expert or SDK)
# 2. Edit backend/scripts/setupThresholdAccount.js with keys
# 3. Run:

node backend/scripts/setupThresholdAccount.js
# Should output: "Success! Account now has 3 signers with med threshold = 2"
```

Verify on [Stellar Expert](https://stellar.expert/explorer/testnet):
- Search account by public key
- Should show 3 signers
- Medium threshold = 2

## 7. Multi-Signature Approval Flow (Full Integration Test)

Setup:
- 3-signer threshold account (low=1, med=2, high=3)
- 3 users: Alice (signer 1), Bob (signer 2), Charlie (signer 3)

Flow:
1. Alice logs in, connects threshold account, proposes 5 XLM payment
   - Backend: creates pending tx, stores XDR
2. Backend sends notification (webhook/polling) → Bob & Charlie see pending
3. Bob logs in, clicks "Pending", connects Freighter, clicks "Approve"
   - Freighter signs XDR
   - Backend: collects Bob's signature, weight=1 (< med threshold 2)
   - Status still: pending
4. Charlie logs in, clicks "Pending", connects Freighter, clicks "Approve"
   - Freighter signs XDR
   - Backend: collects Charlie's signature, weight=1, total=2 (≥ med threshold)
   - Backend auto-submits to Horizon
   - Status → submitted
5. All users see "submitted" status, Horizon confirms transaction

## 8. Notification Testing

In Web app, open browser DevTools → Console:

```javascript
import { notifications } from '@thresho/core';
notifications.success('Test success', {});
notifications.error('Test error', {});
notifications.info('Test info', {});
```

Should see 3 toast notifications in top-right corner.

## 9. Stellar Horizon Integration Verification

```bash
# Check Horizon connectivity
curl https://horizon-testnet.stellar.org/
# Should return version info
```

From web app Dashboard:
- Enter any valid testnet account public key
- Click "Load"
- Should display real balances from Horizon
- Should display real account thresholds & signers

## 10. SEP-7 Link Testing (Web)

In browser console (after loading an unsigned transaction):

```javascript
import * as Core from '@thresho/core';
const xdr = "AAAAAI..."; // sample XDR
const sep7Url = Core.wallet.buildSep7UrlForTx(xdr, 'test');
console.log(sep7Url);
// Should output: web+stellar:tx?xdr=AAAAAI...&network=test
```

Click the link → should prompt Freighter to sign.

## 11. Soroban Rules Pseudocode Test

```javascript
import { sorobanRules } from '@thresho/core';

// Test 1: Check limits
const result1 = sorobanRules.checkLimits({
  amount: 100,
  asset: 'XLM',
  category: 'ops',
  nowUtc: Date.now(),
  maxPerTx: 1000,
  timeLockUntil: 0,
});
console.log(result1); // { ok: true }

// Test 2: Exceeds max
const result2 = sorobanRules.checkLimits({
  amount: 2000,
  maxPerTx: 1000,
});
console.log(result2); // { ok: false, reason: 'Amount exceeds...' }

// Test 3: Audit summary
const summary = sorobanRules.auditSummary({ amount: 100, asset: 'XLM', category: 'ops' });
console.log(summary); // { lines: [...] }

// Test 4: Pre-check approvals
const approved = sorobanRules.precheckApprovals({
  collectedSigners: [{ weight: 1 }, { weight: 1 }],
  requiredWeight: 2,
});
console.log(approved); // { ok: true, weight: 2 }
```

## 12. Performance & Load Testing (Optional)

```bash
# Install Artillery (load testing)
npm install -g artillery

# Create load-test.yml
cat > load-test.yml << EOF
config:
  target: 'http://localhost:4000'
  phases:
    - duration: 10
      arrivalRate: 2
scenarios:
  - name: 'Auth flow'
    flow:
      - post:
          url: '/auth/login'
          json:
            username: 'alice'
            password: 'pwd123'
EOF

# Run
artillery run load-test.yml
```

## Checklist

- [x] Backend starts and listens on port 4000
- [x] Core package exports all modules
- [x] Web app loads at http://localhost:5173
- [x] Login/signup works with invite
- [x] Freighter connection (if extension available)
- [x] Balance queries from Horizon
- [x] Transaction proposal creates pending
- [x] Approval collection works (sign XDR)
- [x] Threshold verification calculates weight
- [x] Auto-submit when threshold met
- [x] Desktop Electron wraps web app
- [x] Mobile Expo starts and logs in
- [x] SEP-7 links open correctly
- [x] Notifications appear on UI

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "address already in use :::4000" | Use different port: `PORT=4001 npm run dev` |
| "Freighter not detected" | Install Freighter extension, refresh page |
| "Invalid public key" | Ensure key starts with 'G' and is ~56 chars |
| "CORS error" | Backend CORS config allows origin; check headers |
| "Horizon timeout" | Check network; try different HORIZON_URL |
| "Mobile can't reach localhost:4000" | Use your machine IP (e.g., 192.168.1.100:4000) |
| "Vite port in use" | Use different port: `npm run dev -- --port 5174` |

---

Ready to test! Start with backend → web → full flow.
