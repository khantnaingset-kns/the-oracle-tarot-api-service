# Build stage
FROM node:lts-slim AS builder

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm build

# Runtime stage
FROM node:lts-alpine

ENV NODE_ENV=production

USER node

WORKDIR /app

COPY --from=builder /app/node_modules /app/node_modules/
COPY --from=builder /app/dist /app/dist/

EXPOSE 3000

ENTRYPOINT [ "node" ]

CMD [ "./dist/main.js" ]
