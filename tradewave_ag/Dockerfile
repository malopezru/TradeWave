FROM node:16-alpine
WORKDIR /
ENV PORT=8000
COPY . .
RUN npm install
EXPOSE $PORT
CMD npm start