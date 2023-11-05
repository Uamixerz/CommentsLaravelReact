FROM node:18-alpine3.17 as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install @popperjs/core
COPY . .
RUN npm run build
