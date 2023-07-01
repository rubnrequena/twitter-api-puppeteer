FROM ghcr.io/puppeteer/puppeteer:latest

WORKDIR /app 
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV PUPPETEER_EXECUTABLE_PATH /usr/bin/chromium

COPY ./package.json /app
RUN npm install --omit=dev


COPY ./build /app
COPY ./.env /app/.env
USER pptruser
RUN mkdir /app/assets

EXPOSE 0.0.0.0:3003:3003
CMD ["node", "index.js"]
#CMD ["sleep","infinity"]
