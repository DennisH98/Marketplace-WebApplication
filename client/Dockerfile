FROM node:14-alpine as build

WORKDIR /client

COPY package.json . 

RUN npm install 

COPY . .

RUN npm run build

FROM nginx:latest
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /client/build /usr/share/nginx/html

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]