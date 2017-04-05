# serverless-demo

## Tools/Frameworks used:
1. Used version 1.9 of the serverless framework (https://github.com/serverless/serverless) for the backend.
2. To run the application locally as an API, use the serverless-offline plugin (https://github.com/dherault/serverless-offline).  
3. All the functions are written in nodejs
4. Redis is used from a docker container, for persistence
5. Website uses angularjs, bootstrap

## What has been done:

### version - v1
1. One page website to post message others to see
2. The current user can only edit/delete those messages which were posted by her/him, if reloads the page, no longer can edit/delete
3. No login, anonymous user can post and see messages, edit/delete while still on the page
4. Anytime a message contains the words "Amazon", "Lambda", or "DynamoDB", messages entered prior to it archived to a JSON file and purged from view. The message that triggered the purge will now be the first message available to all new visitors.
5. When a message contains the word "Amazon", the backend can detect it so that a amazon SNS message can be called

### version - v2
1. push the message to kinesis stream and handle the checking - purging operation
2. do not overwrite existing file
3. tag the old, new and release versions
4. separate sns push

### To start the Redis

install docker on your machine, then

```
docker pull redis

docker run -d --name statup-redis -p 6379:6379 redis
```
from next time, just type
```
docker start statup-redis
```


### To start kinesalite on a docker container

```
docker pull dlsniper/kinesalite

docker run -d --name statup-kinesis -p 4567:4567 dlsniper/kinesalite
```
from next time, just type
```
docker start statup-kinesis
```

### To create a stream called statup
```
aws kinesis create-stream --stream-name Foo --shard-count 1
```

### To subscribe lambda post, update function to kinesis polling
```
cd server/
KINESIS_ENDPOINT=http://localhost:4567 STREAM_NAME=statup node subscribe-lambda-for-kinesis-polling.js
```

### To start the server
```
cd server
npm start
```

### To start the client:
```
cd client
npm start
```