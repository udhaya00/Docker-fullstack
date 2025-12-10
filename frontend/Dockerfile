# ---------- Stage 1: Build ----------
FROM node:18-alpine AS build

WORKDIR /app

# Copy only dependency files first (better caching)
COPY package*.json ./

# Since there is no package-lock.json, npm ci will fail.
# So we use npm install (safe, reliable)
RUN npm install --omit=optional

# Copy actual source code
COPY . .

# Build the React app
RUN npm run build


# ---------- Stage 2: Serve with Nginx ----------
FROM nginx:alpine

# Clean default nginx content
RUN rm -rf /usr/share/nginx/html/*

# Copy React build to nginx root
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom nginx config if you have one
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
