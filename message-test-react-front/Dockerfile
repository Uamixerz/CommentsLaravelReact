FROM node:18-alpine3.17 as build

WORKDIR /usr/src/app/message-test-react-front

COPY package*.json ./

RUN npm install
RUN npm install @popperjs/core
COPY . .

EXPOSE 3000
