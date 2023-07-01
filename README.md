## Run Docker

sudo docker run -p 0.0.0.0:3003:3003 --rm --name tweet rubn1987/srq:twitter-bot

# PROD

docker run -p 0.0.0.0:3003:3003 --rm --name fb -v /app/emiliobot:/app/assets -v /root/docker_ouput/out:/app/out rubn1987/srq:fb-emilio-v2.4

## Build

sudo docker build -t rubn1987/srq:twitter-bot .

## Push docker image

docker user: rubn1987
docker pass: rub3n.1987
docker tag local-image:tagname new-repo:tagname
docker push rubn1987/srq:twitter-bot

## Clear docker

docker system prune -a

## Copy Files

sudo docker cp fb:/app/out/shots/sorteoSelector_searching.jpg ./shot.jpg
sudo docker cp fb:/app/out/shots/sorteoSelector_searching.html ./shot.html
