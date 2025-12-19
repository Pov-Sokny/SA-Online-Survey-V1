# --- Stage 1: Build ---
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source code and build
COPY . .
# Next.js requires these envs during build time for some features
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# --- Stage 2: Runner ---
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copy only the necessary files for a standalone execution
# Note: Ensure "output: 'standalone'" is set in your next.config.mjs
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

# Next.js standalone server starts with server.js
CMD ["node", "server.js"]