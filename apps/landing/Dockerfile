FROM node:20 as base
RUN npm install -g pnpm

FROM base AS pruner
WORKDIR /app
RUN npm install turbo@1.11.3 -g
COPY . .
RUN turbo prune --scope=landing --docker

FROM base AS installer
WORKDIR /app
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN export COREPACK_ENABLE_STRICT=0 && pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=installer /app/ .
COPY --from=pruner /app/out/full/ .
RUN export COREPACK_ENABLE_STRICT=0 && pnpm build --filter=landing

FROM base AS runner
WORKDIR /app
COPY --from=builder /app/ .
CMD export COREPACK_ENABLE_STRICT=0 && pnpm start --filter=landing
