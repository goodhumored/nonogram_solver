FROM node:current-alpine3.16 as build

WORKDIR /app

COPY package*.json .

COPY . .

RUN npm i

RUN npm build

CMD [ "node", "dist/main"]