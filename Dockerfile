# syntax=docker/dockerfile:1

# ---- Base ----
FROM node:20-alpine AS base
WORKDIR /app

# ---- Dependencies ----
FROM base AS deps
RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json* ./
RUN npm ci --only=production && npm cache clean --force

# ---- Builder ----
FROM base AS builder

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .

# Build arguments for environment variables needed at build time
ARG GHOST_CONTENT_API_URL
ARG GHOST_CONTENT_API_KEY
ARG NEXT_PUBLIC_SITE_URL

ENV GHOST_CONTENT_API_URL=${GHOST_CONTENT_API_URL}
ENV GHOST_CONTENT_API_KEY=${GHOST_CONTENT_API_KEY}
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}

# Disable Next.js telemetry during build
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# ---- Runner ----
FROM base AS runner

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files from builder
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
