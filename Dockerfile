FROM node:20-alpine

WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build
RUN rm -rf src/ static/ emailTemplates/ docker-compose.yml

CMD ["node","build/index.js"]
