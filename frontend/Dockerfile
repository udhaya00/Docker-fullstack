# ---------- Stage 1: Build ----------
FROM node:18-alpine AS build

WORKDIR /app

# Only copy dependency files first (max cache usage)
COPY package*.json ./

# Install only what is needed (no optional deps)
RUN npm ci --omit=optional || npm install --omit=optional

# Copy project source
COPY . .

RUN npm run build


# ---------- Stage 2: Final Nginx ----------
FROM nginx:alpine

# Remove default nginx files
RUN rm -rf /usr/share/nginx/html/*

# Copy built React files
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
