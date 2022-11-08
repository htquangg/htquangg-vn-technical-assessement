# TOIMPROVE: use alpine instead.
ARG NODE_VERSION=14.19.0

# Build Stage 1
# This build created a staging docker image
FROM node:$NODE_VERSION as appbuild

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

# # Build Stage 2
# # This build installs production dependencies
# FROM node:$NODE_VERSION as dependencies
#
# WORKDIR /app
#
# COPY --from=appbuild /app/package.json .
#
# RUN npm install --omit=dev --ignore-scripts

# Build Stage 3
# This build takes the production build from staging build, and production dependencies
FROM node:$NODE_VERSION as main

WORKDIR /app

ENV NODE_ENV production

COPY --from=dependencies /app/package.json .
COPY --from=appbuild /app/node_modules ./node_modules
COPY --from=appbuild /app/dist ./dist
COPY --from=appbuild /app/.env.example .env

ENV PORT=3000
EXPOSE $PORT

CMD ["node", "dist/apps/api/main.js"]
