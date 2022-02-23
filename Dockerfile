# stage 1
FROM node
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
RUN npm install
COPY . .
RUN node_modules/.bin/ng build --prod --output-path=/dist

# stage 2
FROM nginx:alpine
WORKDIR /usr/src/app
RUN rm -rf /usr/share/nginx/html/*
COPY --from=0 /dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]