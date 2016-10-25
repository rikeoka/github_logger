FROM node:6.9.1

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app/
RUN npm install --only=production
COPY app.js /app
COPY hooks /app/hooks
COPY utils /app/utils

CMD [ "npm", "start" ]
