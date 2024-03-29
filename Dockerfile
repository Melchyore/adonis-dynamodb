FROM node:14-alpine as build-deps

RUN apk update && apk upgrade && \
  apk add --update git && \
  apk add --update openssh && \
  apk add --update bash && \
  apk add --update wget

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install -g coveralls
RUN npm install -g nyc

# Install peer dependencies
RUN npm install @adonisjs/core

RUN mkdir -p ./.nyc_output
RUN mkdir -p ./coverage

COPY . .

