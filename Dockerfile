FROM node:18.16.0

WORKDIR /app

COPY . .

# building the app
RUN npm i
RUN npm run build
#RUN next build

# Running the app
#CMD [ "npm", "start" ]

CMD [ "npm", "run","start" ]
