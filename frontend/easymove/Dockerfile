FROM node:18-alpine
WORKDIR /usr/src/app/easymove/
COPY . .
RUN npm install
RUN npm run build
CMD ["npm", "run", "dev"]

# RUN npm i -g serve
# CMD [ "serve", "-s", "dist" ]