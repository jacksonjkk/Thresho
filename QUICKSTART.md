# 🚀 Quick Start (60 seconds)

## Prerequisites
- Node.js 18+
- npm 9+

## Steps

### 1. Install & Start Backend
cd backend```bash

npm install
npm run dev
# ✅ Listening on http://localhost:4000
```

### 2. In New Terminal: Start Web
```bash
cd web
npm install
npm run dev
# ✅ Running on http://localhost:5173
```

### 3. Open Browser
```
http://localhost:5173
```

### 4. Test Signup → Login → Dashboard
1. Click "Generate Invite"
2. Copy invite code
3. Switch to "Sign up"
4. Enter any username/password + invite code
5. Login
6. ✅ **You're in!**

---

## What You Can Do

- **Dashboard**: Connect to a Stellar testnet wallet (Freighter), view balances
- **New Transaction**: Propose a payment transaction for approval
- **Pending**: Approve pending transactions (sign with Freighter)
- **Wallet**: View account signers and thresholds

---

## Optional: Try Desktop
```bash
# Terminal 3 (while web is running):
cd desktop
npm install
npm run dev
# Electron window opens, runs web app inside
```

---

## Optional: Try Mobile
```bash
# Terminal 3:
cd mobile
npm install
npm start
# Scan QR code with Expo Go app
```

---

## Full Docs
- **Setup & Architecture**: [SETUP_RUN.md](docs/SETUP_RUN.md)
- **Testing Guide**: [TESTING.md](TESTING.md)
- **File Reference**: [FILE_REFERENCE.md](FILE_REFERENCE.md)
- **Project Summary**: [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)

---

## 🎯 Next: Create a Real Threshold Account

With a funded testnet account, you can set up 3 signers with medium threshold = 2:

```bash
# Edit backend/scripts/setupThresholdAccount.js with your keys
node backend/scripts/setupThresholdAccount.js
```

Then use that account in the app to test multi-signature approvals!

---

**Backend running?** ✅  
**Web running?** ✅  
**Ready to explore?** Let's go! 🌟
