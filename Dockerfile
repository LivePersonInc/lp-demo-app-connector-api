FROM node:latest

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

#for production change to:
#RUN npm run build

RUN npm run build-local

EXPOSE 8282

#for production change to:
#CMD ["npm", "start"]
CMD ["node", "app"]
