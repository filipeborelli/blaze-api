FROM node:lts as base

WORKDIR /usr/app

COPY package*.json ./

ARG NPM_TOKEN

COPY . .

RUN echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > /usr/app/.npmrc && \
    npm install -g npm@8.3.2 && \
    yarn -i && \
    rm -rf /usr/app/.npmrc

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]