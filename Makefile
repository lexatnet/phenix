DOCKER_COMPOSE_FILE = ./deploy/docker/docker-compose.yml

initialize:
	$(MAKE) create-storage
	$(MAKE) deps-install
	$(MAKE) db-initialize

create-storage:
	docker volume create volume-db

deps-install:
	$(MAKE) backend-deps-install
	$(MAKE) frontend-deps-install
	$(MAKE) mock-server-deps-install

db-initialize:
	docker-compose --file $(DOCKER_COMPOSE_FILE) run --rm backend npm run initialize

backend-deps-install:
	docker-compose --file $(DOCKER_COMPOSE_FILE) run --rm backend npm install

frontend-deps-install:
	docker-compose --file $(DOCKER_COMPOSE_FILE) run --rm frontend npm install

mock-server-deps-install:
	docker-compose --file $(DOCKER_COMPOSE_FILE) run --rm mock-server npm install

run-application:
	docker-compose --file $(DOCKER_COMPOSE_FILE) up backend frontend

run-db-adminer:
	docker-compose --file $(DOCKER_COMPOSE_FILE) run adminer

debug:
	$(MAKE) debug-backend
	$(MAKE) debug-frontend
	$(MAKE) run-db-adminer

debug-backend:
	docker-compose \
	--file $(DOCKER_COMPOSE_FILE) \
	run \
	--rm \
	--publish 6000:6000 \
	--publish 9229:9229 \
	backend \
	npm run debug

debug-frontend:
	docker-compose \
	--file $(DOCKER_COMPOSE_FILE) \
	run \
	--rm \
	--publish 3000:3000 \
	--publish 9228:9229 \
	frontend \
	npm run debug

clean:
	docker volume rm volume-db
	docker-compose --file $(DOCKER_COMPOSE_FILE) stop
	docker-compose --file $(DOCKER_COMPOSE_FILE) rm
	sudo rm -r app/backend/node_modules
	sudo rm -r app/frontend/node_modules

down:
	docker-compose --file $(DOCKER_COMPOSE_FILE) down

frontend-eslint:
	docker-compose --file $(DOCKER_COMPOSE_FILE) run --rm  frontend npm run eslint

backend-eslint:
	docker-compose --file $(DOCKER_COMPOSE_FILE) run --rm backend npm run eslint

connect-frontend:
	docker-compose --file $(DOCKER_COMPOSE_FILE) exec frontend bash

connect-backend:
	docker-compose --file $(DOCKER_COMPOSE_FILE) exec backend bash

connect-mock-server:
	docker-compose --file $(DOCKER_COMPOSE_FILE) exec mock-server bash

connect-db:
	docker-compose --file $(DOCKER_COMPOSE_FILE) exec db bash

eslint:
	$(MAKE) backend-eslint
	$(MAKE) frontend-eslint
