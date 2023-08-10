FROM node:14.17.0-alpine
ENV APP_ROOT /usr/src/nuxt-app
ENV NODE_ENV production

WORKDIR ${APP_ROOT}
RUN apk update && apk upgrade
RUN apk add git
ADD . ${APP_ROOT}

# RUN npm ci
RUN npm install
RUN npm install node-sass
RUN npm run generate
RUN npm run build
EXPOSE 3000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

CMD [ "npm", "start" ]
