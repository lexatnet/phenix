DOCKER_COMPOSE_FILE = ./deploy/docker/docker-compose.yml

init:
	docker volume create volume-db

deps-install: backend-deps-install frontend-deps-install mock-server-deps-install

backend-deps-install:
	docker-compose --file $(DOCKER_COMPOSE_FILE) run --rm backend npm install

frontend-deps-install:
	docker-compose --file $(DOCKER_COMPOSE_FILE) run --rm frontend npm install

mock-server-deps-install:
	docker-compose --file $(DOCKER_COMPOSE_FILE) run --rm mock-server npm install

run:
	docker-compose --file $(DOCKER_COMPOSE_FILE) up

clean:
	docker volume rm volume-db
	docker-compose --file $(DOCKER_COMPOSE_FILE) stop
	docker-compose --file $(DOCKER_COMPOSE_FILE) rm
