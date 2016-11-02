FROM node:6.9.1

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app/
RUN npm install --only=production --silent
COPY app.js /app
COPY cert /cert
COPY hooks /app/hooks
COPY utils /app/utils

CMD [ "npm", "start" ]
