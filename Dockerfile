FROM node:20-alpine
RUN npm install -g http-server
WORKDIR /app
COPY . ./ 
EXPOSE 80
CMD ["http-server", "dist"]
