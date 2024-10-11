FROM node:18

WORKDIR /usr/src/app

COPY package.json.lock* ./
COPY package.json ./

RUN npm install

COPY app.js ./

EXPOSE 8000

CMD [ "node", "app.js" ]