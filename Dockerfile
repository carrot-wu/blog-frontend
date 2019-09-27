FROM node
MAINTAINER "carrotWu@gmail.com"
COPY . .
RUN yarn install
RUN yarn build

FROM nginx

COPY ./build/ /usr/share/nginx/html/
COPY ./vhost.nginx.conf /etc/nginx/

EXPOSE 80
