# nginx webserver
FROM nginx:alpine
COPY . /usr/share/nginx/html
# TODO: exclude some files
RUN chmod -R a+r /usr/share/nginx/html/
RUN chown -R nginx:nginx /usr/share/nginx/html/
EXPOSE 80