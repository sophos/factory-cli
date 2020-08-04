FROM node:lts-alpine

RUN mkdir -p /opt/cli
WORKDIR /opt/cli

COPY ./package.json ./package-lock.json ./
RUN npm install

COPY ./bin ./bin
COPY ./dist ./dist

ENTRYPOINT ["./bin/cli.js"]
