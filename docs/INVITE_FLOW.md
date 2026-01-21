# Invite Flow

- Admin generates invite via POST /auth/create-invite
- User signs up with invite code, username, password
- JWT auth used to access wallet and transaction endpoints
- Wallet connection occurs separately (Freighter/SEP-7); app credentials are not blockchain keys
