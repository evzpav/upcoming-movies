.DEFAULT_GOAL := help
include .env.local
NAME = upcoming-movies
VERSION = 1.0.0
PORT = 4000
FRAMEWORK=react

install: ## install server and client dependencies locally
	npm install
	cd ./vue-client && npm install
	cd ./react-client && npm install

build-vue: ## Build static files for Vue
	cd ./vue-client && npm run build

build-react: ## Build static files for React
	cd ./react-client && npm run build

run-vue: ## Run Vue frontend locally at port 8080
	cd vue-client && npm run serve

run-react: ## Run React frontend locally at port 3000
	cd react-client && npm start

run-target: ## run target
	DOCKER_BUILDKIT=1	\
	docker build -t $(NAME):$(VERSION) \
	--target=$(TARGET) .

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
	cd ./vue-client && npm run format
	cd ./vue-client && npm run lint
	cd ./react-client && npm run format
	cd ./react-client && npm run lint
	npm run format
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