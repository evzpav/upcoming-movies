.DEFAULT_GOAL := help

NAME = upcoming-movies
VERSION = 1.0.0
PORT = 4000

install: ## install server and client dependencies locally
	npm install
	cd ./client && npm install

build-front: ## run locally
	cd ./client && npm run build

run-front: ## run locally port 8080
	cd client && npm run serve

run-target: ## run target
	DOCKER_BUILDKIT=1 docker build  -t $(NAME):$(VERSION) --target=$(TARGET) .

audit: ## run audit
	make run-target TARGET=audit

dependencies: ## run dependencies check
	make run-target TARGET=dependencies

test: ## run tests
	make run-target TARGET=test

build-image: ## build docker image
	make run-target TARGET=release

front: ## build front on docker
	make run-target TARGET=front

run-docker: build-image ## run server on docker
	DOCKER_BUILDKIT=1 \
	docker run --rm \
		-e PORT=$(PORT) \
		-e TMBD_API_TOKEN=$(TMBD_API_TOKEN) \
		--network host \
		$(NAME):$(VERSION)

run: ## run locally
	PORT=$(PORT) \
	TMBD_API_TOKEN=$(TMBD_API_TOKEN) \
	node ./server/server.js

lint: ## format code
	cd ./client && npm run format
	npm run format
	cd ./client && npm run lint
	npm run lint

run-swagger:  ## run Swagger OpenAPI doc server.
	docker run \
		-p 9900:8080 \
		-e BASE_URL=/ \
		-e SWAGGER_JSON=/api/api.yaml \
		-v ${PWD}/server/docs:/api \
		swaggerapi/swagger-ui
	$(info Swagger docs running on http://localhost:9900/)

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'