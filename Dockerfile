FROM node:14.18.3-alpine as build-stage

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

EXPOSE 3000

ENTRYPOINT ["npm", "run", "start"]
