FROM node:12-alpine

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build-local

EXPOSE 8282

CMD ["node", "app"]
