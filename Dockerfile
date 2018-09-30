FROM node:8.11.1
VOLUME ["/node-service-frame","/node-service-frame"]
RUN npm install pm2@2.10.4 -g
EXPOSE 5000/tcp