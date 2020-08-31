FROM node:latest

RUN mkdir /serapion

WORKDIR /serapion

COPY package.json .

RUN npm install

COPY . .


EXPOSE 3000

CMD ["npm","run","devStart"]