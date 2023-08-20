##FROM node:18.16.0
##WORKDIR /app
##COPY . .
##RUN npm i
##RUN npm run build
##CMD [ "npm", "run","start" ]
#
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY . .
RUN npm run build
ENV PORT=3000
EXPOSE $PORT

#CMD ["npm", "start -- -p ${PORT}"]
CMD ["npm", "start", "--", "-p", "${PORT}"]


# DO NOT DELETE THE CODE BELOW NEED TO FIX TRANSLATOR FIRST THEN USE MULTISTAGED BUILD

#FROM node:18.16.0 AS builder
#
#WORKDIR /app
#
#COPY package*.json ./
#
#RUN npm install
#
#COPY . .
#
#RUN npm run build
#
#
#FROM node:18.16.0-alpine
#
#WORKDIR /app
#
#COPY --from=builder /app/.next ./.next
#COPY --from=builder /app/.env ./.env
#COPY --from=builder /app/public ./public
#COPY --from=builder /app/package.json ./package.json
#
#RUN npm install --only=production
#
#EXPOSE 3000
#
#CMD ["npm", "start"]
