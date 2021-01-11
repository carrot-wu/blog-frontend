FROM docker.carrotwu.com/library/node:alpine as builder
MAINTAINER "carrotWu@gmail.com"
COPY . .
RUN yarn build


# 选择更小体积的基础镜像
FROM docker.carrotwu.com/library/nginx:alpine
COPY --from=builder ./build/ /usr/share/nginx/html
COPY --from=builder ./nginx.conf /etc/nginx/
EXPOSE 8888
