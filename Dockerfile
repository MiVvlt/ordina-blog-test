FROM node:15

# set working directory
RUN mkdir /app
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Copy application files
COPY ./run /app/
COPY ./gatsby-browser.js /app/
COPY ./gatsby-config.js /app/
COPY ./gatsby-meta-config.js /app/
COPY ./gatsby-node.js /app/

COPY ./src/ /app/src/
COPY ./content/ /app/content/
COPY ./static/ /app/static/

# install and cache app dependencies using yarn
ADD ./package.json ./package-lock.json /app/
RUN npm ci

CMD ["bash", "./run"]

EXPOSE 9000
