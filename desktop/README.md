# Desktop Wrapper (Electron)

Wraps the Web app. In dev mode, points to `http://localhost:5173`.

Run:

```bash
cd web && npm install && npm run dev
# in another terminal
cd desktop && npm install && npm run dev
```

For production, build the web app and load from file:

```bash
cd web && npm run build
cd desktop && npm install && npm start
```
