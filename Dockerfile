FROM node:alpine as builder
MAINTAINER "carrotWu@gmail.com"
COPY package.json yarn.lock ./
ENV SASS_BINARY_SITE https://npm.taobao.org/mirrors/node-sass/
RUN yarn install --frozen-lockfile --registry=https://registry.npm.taobao.org
COPY . .
RUN yarn build

# 选择更小体积的基础镜像
FROM nginx:alpine
COPY --from=builder ./build/ /usr/share/nginx/html
COPY  nginx.conf /etc/nginx/
EXPOSE 8888
