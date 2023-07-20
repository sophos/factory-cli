FROM alpine:3

RUN apk update && apk add --no-cache libstdc++ libgcc

RUN mkdir -p /opt/refactr
WORKDIR /opt/refactr

COPY ./dist/factoryctl-alpine ./bin/factoryctl
RUN chmod +x ./bin/factoryctl

ENV PATH="/opt/refactr/bin:${PATH}"

ENTRYPOINT ["./bin/factoryctl"]
