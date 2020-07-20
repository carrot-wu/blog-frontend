FROM node:alpine as builder
MAINTAINER "carrotWu@gmail.com"
COPY . .
RUN yarn build

# 选择更小体积的基础镜像
FROM nginx:alpine
COPY --from=builder ./build/ /usr/share/nginx/html
COPY  nginx.conf /etc/nginx/
EXPOSE 8888
