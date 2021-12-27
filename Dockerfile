# make sure to use recent node versions such a 14, 15, or 16
# mongoose does not work with node version 7
FROM node:14.15-slim

WORKDIR /api

# copy files from top level to api directory
COPY . /api/

ENV MONGODB_URI=<mongodb connection string>
ENV PORT=8080
ENV NODE_ENV=prod

EXPOSE 8080

RUN npm install


CMD [ "npm", "start" ]

