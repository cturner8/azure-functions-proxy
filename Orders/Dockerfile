ARG NODE_VERSION=18

FROM node:${NODE_VERSION}-alpine as build

# # Use production node environment by default.
# ENV NODE_ENV production

WORKDIR /usr/src/app

COPY package.json .

COPY yarn.lock .

RUN --mount=type=cache,target=/root/.yarn \
    yarn install --frozen-lockfile 

COPY . .

RUN yarn build

RUN yarn install --prod

# To enable ssh & remote debugging on app service change the base image to the one below
# FROM mcr.microsoft.com/azure-functions/node:4-node18-appservice
FROM mcr.microsoft.com/azure-functions/node:4-nightly-node18

RUN groupadd azure -g 2000 && \
    useradd -r -M -s /sbin/nologin -g azure -c azure azure -u 1000 && \
    chown -R azure:azure /azure-functions-host

WORKDIR /home/site/wwwroot

COPY --from=build --chown=azure:azure /usr/src/app/ .

# # Run the application as a non-root user.
USER azure