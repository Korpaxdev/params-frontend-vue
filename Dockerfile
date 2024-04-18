FROM node:alpine

EXPOSE 5173
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .