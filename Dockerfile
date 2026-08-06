# Stage 1: Build the static assets
FROM pgc-docker.artifactory.umn.edu/mirror/library/node:20-alpine AS builder

WORKDIR /app

# Copy dependency files first to leverage Docker layer caching
COPY package*.json ./
RUN npm ci

# Copy source files and build production assets
COPY . .
RUN npx gulp dist

# Stage 2: Serve static files with Nginx
FROM pgc-docker.artifactory.umn.edu/mirror/nginxinc/nginx-unprivileged:1.21

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy Nginx configuration files
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf