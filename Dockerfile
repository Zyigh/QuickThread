FROM node:14-alpine AS builder

WORKDIR /twitterthreader

ADD / .

RUN npm install
RUN npm run build

FROM nginx:1.19-alpine

COPY --from=builder /twitterthreader/dist/ /usr/share/nginx/html
ADD /nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
