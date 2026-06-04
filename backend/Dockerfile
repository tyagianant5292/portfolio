# syntax=docker/dockerfile:1
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=4000

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 api

COPY --from=deps /app/node_modules ./node_modules
COPY --chown=api:nodejs . .

USER api
EXPOSE 4000

CMD ["node", "server.js"]
