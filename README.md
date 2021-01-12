## Build your image:

`docker build . -t ordinablog:1.0.1`

if you don't have a node image yet, add it by running

`docker pull node`

## Run your container:

`docker run -d -p 9000:9000 --name blog ordinablog:1.0.1`

## Open application in browser

Visit: [localhost:9000](http://localhost:9000)

