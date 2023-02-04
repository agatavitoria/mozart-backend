dpl ?= .env
include $(dpl)

start: ## Run server on debug mode
	docker-compose up

bash_app: ## Run bash
	docker exec -it $(APP_CONTAINER_NAME) /bin/bash

bash_db: ## Run bash
	docker exec -it $(POSTGRES_CONTAINER_NAME) /bin/bash