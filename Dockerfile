FROM node:13 as builder

EXPOSE 80

WORKDIR /usr/app
COPY ./package.json .
RUN command npm install
COPY . .

CMD ["npm", "run","start"]

