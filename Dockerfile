# ---- Base Node ----
FROM node:12-stretch-slim AS base
ENV NODE_ENV=development
RUN mkdir /app && chown -R node:node /app
RUN mkdir /app/vue-client && chown -R node:node /app/vue-client
WORKDIR /app
USER node
RUN npm set progress=false && npm config set depth 0

# ---- Audit ----
# FROM base AS audit
# COPY --chown=node:node package*.json ./
# RUN npm audit

# ---- Dependencies ----
FROM base AS server-dependencies
WORKDIR /app
COPY --chown=node:node package*.json ./
RUN npm ci --production && npm cache clean --force

# #---- Test ----
FROM server-dependencies AS test
RUN npm ci --development
COPY --chown=node:node ./server ./server
RUN npm test

# ---- Frontend Dependencies ----
FROM base AS front-dependencies
WORKDIR /app/vue-client
COPY --chown=node:node ./vue-client/package*.json ./
RUN npm ci && npm cache clean --force

# ---- Front ----
FROM front-dependencies AS front
WORKDIR /app/vue-client
COPY --chown=node:node ./vue-client ./
RUN npm run build

# ---- Release ----
FROM server-dependencies AS release
WORKDIR /app
COPY --chown=node:node --from=front /app/vue-client/build ./vue-client/build
COPY --chown=node:node ./server ./server
ENV NODE_ENV=production
CMD [ "node","server/server.js"]

