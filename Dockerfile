FROM node:16-alpine

WORKDIR /usr/src/app

RUN apk update
RUN apk add bash nodejs npm curl

COPY package.json package-lock.json ./

RUN npm install

RUN mkdir -p ./eveData
RUN curl -o ./eveData/mapSolarSystems.csv https://www.fuzzwork.co.uk/dump/latest/mapSolarSystems.csv
RUN curl -o ./eveData/mapSolarSystemJumps.csv https://www.fuzzwork.co.uk/dump/latest/mapSolarSystemJumps.csv

COPY . ./

RUN npm run build

RUN chmod +x ./dist/main.js
RUN chmod +x ./docker/run.sh

ENTRYPOINT ["./docker/run.sh"]

EXPOSE 2001

CMD ["node", "dist/main.js"]
