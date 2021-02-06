FROM node:latest

# Create app directory
RUN mkdir -p /documents/Presenter/ 
WORKDIR /documents/Presenter/

ENV PORT 8080
 
COPY package.json /documents/Presenter/
RUN npm install

COPY . /documents/Presenter/
 
EXPOSE $PORT
 
CMD ["npm", "start"]