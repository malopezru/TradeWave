FROM node:18

WORKDIR /APP
COPY package.json .
RUN npm i

COPY . .

CMD node dist/app.js