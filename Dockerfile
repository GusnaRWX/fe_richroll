#FROM node:18.16.0
#WORKDIR /app
#COPY . .
#RUN npm i
#RUN npm run build
#CMD [ "npm", "run","start" ]

FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
