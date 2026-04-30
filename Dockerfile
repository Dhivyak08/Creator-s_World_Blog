FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY index.html /usr/share/nginx/html/
COPY login.html /usr/share/nginx/html/
COPY signup.html /usr/share/nginx/html/
COPY dashboard.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY auth.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/
COPY auth.js /usr/share/nginx/html/
COPY dashboard.js /usr/share/nginx/html/
COPY logo.png /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
