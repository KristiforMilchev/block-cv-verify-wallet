FROM node:12.14-alpine AS build
WORKDIR /dist/src/app
RUN npm cache clean --force
COPY . .
RUN npm install
RUN npm run build --prod

COPY --from=build /dist/blockcv /root/etc/nginx/html/blockcv
EXPOSE 80
