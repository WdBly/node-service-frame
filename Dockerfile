FROM node:8.11.1
COPY . /node-server-frame
WORKDIR /node-server-frame
RUN npm install pm2@2.10.4 -g 
RUN ["npm", "install"]
EXPOSE 5000/tcp
CMD npm run build && npm run server
