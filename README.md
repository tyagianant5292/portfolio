# Anant Kumar — Portfolio

Personal portfolio site for a DevOps / AI Cloud Infrastructure Engineer.
Built to be deployed **two ways** — managed on Vercel, and self-hosted on
Kubernetes via a Helm chart — because that itself is the DevOps showcase.

**Live:** 🌐 [infinityagi.vercel.app](https://infinityagi.vercel.app) ·
🔌 API [anant-portfolio-api.onrender.com](https://anant-portfolio-api.onrender.com)

```
portfolio/
├── frontend/                # Next.js 15 portfolio site (App Router, Tailwind)
│   └── Dockerfile           # multi-stage, standalone output, non-root
├── backend/                 # Express contact-form API (deploy on Render)
│   └── Dockerfile
├── helm/portfolio/          # Helm chart — deploys frontend (+ optional backend)
├── render.yaml              # Render Blueprint for the backend API
└── .github/workflows/       # CI: build + push both images to Docker Hub
```

| Thing            | Value                                   |
| ---------------- | --------------------------------------- |
| Docker Hub       | `tyagianant98`                          |
| GitHub           | `tyagianant5292`                        |
| Frontend image   | `tyagianant98/portfolio-frontend`       |
| Backend image    | `tyagianant98/portfolio-backend`        |
| Node version     | 22 (works on 20+)                       |

---

## 1. Local development

> Requires Node 22 (`nvm use 22`).

**Backend** (terminal 1):

```bash
cd backend
cp .env.example .env        # SMTP optional — without it, messages are just logged
npm install
npm run dev                 # http://localhost:4000
```

**Frontend** (terminal 2):

```bash
cd frontend
cp .env.example .env.local  # NEXT_PUBLIC_API_URL=http://localhost:4000
npm install
npm run dev                 # http://localhost:3000
```

To edit content (experience, skills, etc.) change **`frontend/src/data/resume.ts`** —
it is the single source of truth for the whole site.

---

## 2. Deploy the frontend to Vercel

1. Push this repo to GitHub (`tyagianant5292/portfolio`).
2. On [vercel.com](https://vercel.com) → **New Project** → import the repo.
3. Set **Root Directory** to `frontend`.
4. Add an Environment Variable:
   `NEXT_PUBLIC_API_URL = https://anant-portfolio-api.onrender.com`
5. Deploy. Every push to `main` auto-deploys.

Vercel auto-detects Next.js — no extra config needed. (`output: standalone`
in `next.config.js` is only used for Docker; Vercel ignores it.)

---

## 3. Deploy the backend to Render

1. On [render.com](https://render.com) → **New** → **Blueprint** → select this repo.
2. Render reads `render.yaml` and creates the `anant-portfolio-api` web service.
3. In the service's **Environment**, add the secret `SMTP_PASS`
   (a Gmail **App Password**, not your account password).
4. Update `ALLOWED_ORIGINS` to include your real Vercel URL.

Health check: `GET /health` → `{"status":"ok"}`.

> No SMTP configured? The API still runs and logs messages instead of emailing —
> handy for testing.

---

## 4. CI/CD — GitHub Actions → Docker Hub

`.github/workflows/docker-build-push.yml` builds **both** images and pushes them
to Docker Hub on every push to `main`.

Add these repo secrets (**Settings → Secrets and variables → Actions**):

| Secret               | Value                                            |
| -------------------- | ------------------------------------------------ |
| `DOCKERHUB_USERNAME` | `tyagianant98`                                   |
| `DOCKERHUB_TOKEN`    | a Docker Hub access token (Account → Security)   |

Images are tagged `latest` and the short commit SHA (e.g. `a1b2c3d`).
You can also run it manually from the **Actions** tab (`workflow_dispatch`).

### Build images locally

```bash
# Frontend (bake the API URL at build time)
docker build -t tyagianant98/portfolio-frontend:latest \
  --build-arg NEXT_PUBLIC_API_URL=https://anant-portfolio-api.onrender.com \
  ./frontend

# Backend
docker build -t tyagianant98/portfolio-backend:latest ./backend

docker run -p 3000:3000 tyagianant98/portfolio-frontend:latest
```

---

## 5. Deploy on Kubernetes with Helm

The chart lives in `helm/portfolio`. By default it deploys **only the frontend**
(the backend stays on Render), but you can enable the backend in-cluster too.

```bash
# Frontend only, with ingress (e.g. on your k3d mac-cluster)
helm upgrade --install portfolio ./helm/portfolio \
  --set ingress.enabled=true \
  --set ingress.host=portfolio.local

# Add to /etc/hosts:  127.0.0.1  portfolio.local
```

Run the backend in-cluster as well:

```bash
# 1. SMTP password as a Secret
kubectl create secret generic portfolio-smtp \
  --from-literal=SMTP_PASS='your-app-password'

# 2. Deploy both, route /api -> backend
helm upgrade --install portfolio ./helm/portfolio \
  --set backend.enabled=true \
  --set backend.existingSecret=portfolio-smtp \
  --set ingress.enabled=true \
  --set ingress.host=portfolio.local
```

No ingress controller? Port-forward instead:

```bash
kubectl port-forward svc/portfolio-frontend 8080:80   # http://localhost:8080
```

Useful commands:

```bash
helm lint ./helm/portfolio
helm template portfolio ./helm/portfolio              # render manifests
helm uninstall portfolio
```

Key `values.yaml` knobs: `frontend.image.tag`, `backend.enabled`,
`ingress.enabled/host/tls`, and resource requests/limits.

---

## Stack

Next.js 15 · React 19 · Tailwind CSS · Express · Nodemailer · Docker · Helm ·
GitHub Actions · Vercel · Render · Kubernetes
