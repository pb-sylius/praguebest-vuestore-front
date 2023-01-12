FROM node:14.19.0 as node_dev

# ENV NODE_CONFIG_ENV=docker PM2_ARGS=--no-daemon BIND_HOST=0.0.0.0 VS_ENV=prod

ARG COMMIT
ENV LAST_COMMIT=${COMMIT}

WORKDIR /var/www

COPY . .

# run inside the container on first build
# yarn install --network-concurrency 1 && yarn build:sylius && yarn cache clean --all && yarn start:sylius (or yarn dev:sylius)

