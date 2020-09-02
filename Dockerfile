FROM node:lts-alpine

RUN mkdir -p /opt/refactr
WORKDIR /opt/refactr

COPY ./package.json ./package-lock.json ./
RUN npm install

COPY ./bin ./bin
COPY ./dist ./dist

ENV PATH="/opt/refactr/bin:${PATH}"

ENTRYPOINT ["./bin/refactrctl"]
