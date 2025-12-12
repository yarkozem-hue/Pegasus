FROM node:20-alpine

WORKDIR /usr/src/app

# copy package files first for cached install
COPY package*.json ./

RUN npm ci --production

# copy app sources
COPY . .

EXPOSE 5174

ENV NODE_ENV=production

CMD ["node", "server.js"]
