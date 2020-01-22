FROM node:13

EXPOSE 80

WORKDIR /usr/app
COPY ./package.json .
RUN npm install
COPY . .

CMD ["npm","run","start"]