
# 选择更小体积的基础镜像
FROM docker.carrotwu.com/library/nginx:alpine
COPY ./build/ /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/
EXPOSE 8888
