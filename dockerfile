FROM node:alpine as build

WORKDIR /forum-frontend

COPY . .

RUN npm install

RUN npm run build

FROM nginx:alpine

COPY --from=build forum-frontend/dist/forum-frontend/browser /usr/share/nginx/html

EXPOSE 80
