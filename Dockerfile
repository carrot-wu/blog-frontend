FROM nginx

COPY ./build/ /usr/share/nginx/html/
COPY ./vhost.nginx.conf /etc/nginx/

EXPOSE 80
