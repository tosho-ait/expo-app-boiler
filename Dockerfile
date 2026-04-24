FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy shared module
COPY shared ./shared

# Copy web package
COPY web/package.json ./web/

# Install dependencies
WORKDIR /app/web
RUN npm install --legacy-peer-deps

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

# Copy shared and web source
COPY shared ./shared
COPY web ./web

# Copy node_modules from deps
COPY --from=deps /app/web/node_modules ./web/node_modules

WORKDIR /app/web

# Explicitly install native binaries for Alpine Linux (musl) if needed
# RUN npm install --no-save @tailwindcss/oxide-linux-x64-musl lightningcss-linux-x64-musl

RUN npm run build --verbose

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/web/public ./web/public

# Set the correct permission for prerender cache
RUN mkdir -p web/.next
RUN chown nextjs:nodejs web/.next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing

COPY --from=builder --chown=nextjs:nodejs /app/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/web/.next/static ./web/.next/static

USER nextjs

EXPOSE 80

ENV PORT 80

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output

CMD node web/server.js
