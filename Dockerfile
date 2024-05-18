FROM node:21-alpine3.19

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install && npm cache clean --force

COPY . .

EXPOSE 3001

CMD ["npm", "start"]
