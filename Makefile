build:
	docker build --no-cache -t socialcrab/landing:prod .

init:
	docker service create --replicas 1 --name landing -p 3002:5000 -d socialcrab/landing:prod

deploy_landing_prod:
	docker build --no-cache -t socialcrab/landing:prod . && docker service update landing --force
