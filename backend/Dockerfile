FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

# Install only production deps
RUN npm ci --omit=dev || npm install --omit=dev

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
