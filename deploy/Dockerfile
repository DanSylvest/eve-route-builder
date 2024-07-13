FROM node:16-alpine

WORKDIR /usr/src/app

RUN apk update
RUN apk add bash
RUN apk add nodejs npm
RUN apk add curl

COPY package.json package-lock.json ./

CMD ["./deploy/run.sh"]
