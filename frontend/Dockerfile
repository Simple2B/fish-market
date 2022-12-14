FROM node as build
WORKDIR /app
ARG VITE_API_BASE_URL
COPY package*.json ./
COPY yarn.lock ./
RUN yarn
COPY . .

RUN yarn build


FROM nginx as prod
WORKDIR /app
COPY --from=build /app/dist ./build
COPY --from=build /app/src ./src
