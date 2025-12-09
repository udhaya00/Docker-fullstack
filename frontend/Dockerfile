# ---------- Stage 1: Build React app ----------
FROM node:18-alpine AS build

WORKDIR /app

# Install dependencies using lockfile for reproducible builds
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# ---------- Stage 2: Nginx to serve built files ----------
FROM nginx:alpine

# Copy build output from previous stage to Nginx's html directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy our custom nginx config (we’ll create this next)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]