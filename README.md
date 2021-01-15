## Build your image:

`docker build . -t ordinablog:1.0.1`

if you don't have a node image yet, add it by running

`docker pull node`

## Run your container:

`docker run -d -p 9000:9000 --name blog ordinablog:1.0.1`

## Open application in browser

Visit: [localhost:9000](http://localhost:9000)



## Creating a blogpost

### remark heading

At the top of your .md file add the following (remark) heading
```markdown
---
authors: [michael_vervloet] # an array of author ID's (defined in 'content/authors/authors.yaml')
title: 'Stairway to Health' # the title of your blogpost
image: ./img/stairway-to-health.jpg # the cover image of your blogpost (relative path to image from blogpost file)
tags: [Node.js, NestJS, MongoDB, Angular, Express, TypeScript, Angular-CLI, Internet of Things, LoRa] # array of tags
category: 'IoT' # what category your blogpost belongs to (required!)
draft: false # if true, your post won't be shown on the blog yet (required! even if false)
date: 2017-10-12 16:21:13  # the date of your blogpost, format: YYYY-MM-DD
---
```
