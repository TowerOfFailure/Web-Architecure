FROM node:10-alpine
WORKDIR /app
COPY package.json .
COPY pages .
COPY server.js .
RUN npm install

RUN adduser -D myuser
USER myuser

CMD ["node", "server.js"]
