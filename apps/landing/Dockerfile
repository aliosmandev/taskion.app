FROM node:20 as base
RUN npm install -g pnpm@latest
RUN npm install turbo -g

FROM base AS pruner
WORKDIR /app
COPY . .
RUN turbo prune --scope=landing --docker

FROM base AS installer
WORKDIR /app
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install

FROM base AS builder
WORKDIR /app
COPY --from=installer /app/ .
COPY --from=pruner /app/out/full/ .
RUN turbo build --filter=landing

FROM base AS runner
WORKDIR /app
COPY --from=builder /app/ .
CMD turbo start --filter=landing
