dev-up:
	docker compose -f docker-compose.dev.yaml up -d
dev-stop:
	docker compose -f docker-compose.dev.yaml stop
dev-build:
	docker compose -f docker-compose.dev.yaml build
dev-down:
	docker compose -f docker-compose.dev.yaml down
dev-restart:
	docker compose -f docker-compose.dev.yaml restart
dev-logs:
	docker compose -f docker-compose.dev.yaml logs
dev-logs-f:
	docker compose -f docker-compose.dev.yaml logs -f
dev-next:
	docker compose -f docker-compose.dev.yaml exec next bash
dev-next-logs:
	docker compose -f docker-compose.dev.yaml logs next
dev-next-build:
	docker compose -f docker-compose.dev.yaml build next
dev-next-up:
	docker compose -f docker-compose.dev.yaml up -d next
dev-next-restart:
	docker compose -f docker-compose.dev.yaml restart next
dev-next-up-recreate:
	docker compose -f docker-compose.dev.yaml up -d --force-recreate next
dev-pg:
	docker compose -f docker-compose.dev.yaml exec pg psql -U diet
help:
	@echo "dev-up: start dev environment"
	@echo "dev-down: stop dev environment"
	@echo "dev-restart: restart dev environment"
	@echo "dev-logs: show logs for dev environment"
	@echo "dev-logs-f: show logs for dev environment (follow)"
	@echo "dev-next: open shell in next container"
	@echo "dev-next-logs: show logs for next container"
	@echo "dev-next-build: build next container"
	@echo "dev-pg: open psql shell for dev db"
	@echo "help: show this help"