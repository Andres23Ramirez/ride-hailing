FROM node:19-alpine

WORKDIR /usr/src/ride-hailing
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start:dev"]
