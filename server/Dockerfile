FROM node:16.13.0

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

COPY ./dist ./dist

CMD ["yarn", "build", "start", "prod"]

