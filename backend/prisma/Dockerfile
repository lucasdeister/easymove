FROM node:16
WORKDIR /usr/src/app/prisma
RUN npm i prisma
COPY schema.prisma ./
RUN npx prisma generate
CMD ["npx", "prisma", "studio"]