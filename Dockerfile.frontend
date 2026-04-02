# Stage 1: Build
FROM node:22-slim AS build

WORKDIR /app

COPY frontend/package.json frontend/package-lock.json* ./

RUN npm ci

COPY frontend/ .

RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy built files
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx config template
COPY frontend/nginx.conf.template /etc/nginx/templates/default.conf.template

EXPOSE 5000
