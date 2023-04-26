FROM node:16-alpine

WORKDIR /usr/src/ride-hailing
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start:dev"]
