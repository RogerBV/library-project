#FROM node:22-slim AS base
FROM mcr.microsoft.com/playwright:v1.56.1-jammy AS base

WORKDIR /app

COPY package*.json ./

RUN npm install

FROM base AS development

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]