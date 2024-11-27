# Base image
FROM node:16-alpine
WORKDIR /usr/src/app/
COPY .env.production ./
COPY package*.json ./
RUN npm install
RUN mkdir ./src && mkdir ./public
COPY ./src ./src
COPY ./public ./public
RUN npm run build
RUN npm install -g serve
CMD ["serve", "-s", "build"]
