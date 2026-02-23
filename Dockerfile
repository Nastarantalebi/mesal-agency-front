ARG BUN_VERSION=1.3.9-alpine
ARG NGINX_VERSION=stable-alpine3.23

FROM artifacts.repo.mesal.ir/docker-proxy/oven/bun:${BUN_VERSION} AS deps
WORKDIR /app
COPY package.json bun.lock bunfig.toml ./
RUN bun ci

FROM deps AS builder
WORKDIR /app
ARG MODE=production
COPY . .
RUN NODE_ENV=${MODE} ./node_modules/.bin/vite build --mode ${MODE}

FROM artifacts.repo.mesal.ir/docker-proxy/library/nginx:${NGINX_VERSION}
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY --chown=nginx:nginx --from=builder /app/dist /usr/share/nginx/html
RUN mkdir -p /var/cache/nginx && chown -R nginx:nginx /var/cache/nginx

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3000/health || exit 1

USER nginx
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]