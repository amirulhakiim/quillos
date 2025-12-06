# -----------------------------------------------------------------------------
# Stage 1: Build the App
# -----------------------------------------------------------------------------
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Enable pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
# We use a cache mount to speed up repeated builds
RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the app
RUN pnpm run build

# Prune dev dependencies (CI=true prevents the TTY error)
RUN CI=true pnpm prune --prod

# -----------------------------------------------------------------------------
# Stage 2: Production Runner
# -----------------------------------------------------------------------------
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

# 1. Security: Don't run as root
# The 'node' user comes built-in with the image (UID 1000)
USER node

# 2. Permissions: We must copy files and give ownership to the 'node' user
# If we don't do --chown, the 'node' user won't be able to read/execute them
COPY --from=builder --chown=node:node /app/.output ./.output
COPY --from=builder --chown=node:node /app/package.json ./package.json

# (Optional) Uncomment if you have runtime errors about missing modules
# COPY --from=builder --chown=node:node /app/node_modules ./node_modules

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]