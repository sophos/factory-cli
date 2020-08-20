FROM node:lts-alpine

RUN mkdir -p /opt/cli
WORKDIR /opt/cli

COPY ./package.json ./package-lock.json ./
RUN npm install

COPY ./bin ./bin
COPY ./dist ./dist

ENV PATH="/opt/cli/bin:${PATH}"

ENTRYPOINT ["./bin/cli"]
