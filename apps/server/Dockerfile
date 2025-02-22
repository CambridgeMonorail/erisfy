FROM node:18-alpine
WORKDIR /workspace
COPY package*.json ./
RUN pnpm install
COPY . .
EXPOSE 3001