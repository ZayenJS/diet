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
dev-next-stop:
	docker compose -f docker-compose.dev.yaml stop next
dev-next-down:
	docker compose -f docker-compose.dev.yaml down next
dev-pg:
	docker compose -f docker-compose.dev.yaml exec pg psql -U diet
dev-pg-logs:
	docker compose -f docker-compose.dev.yaml logs pg
dev-pg-restart:
	docker compose -f docker-compose.dev.yaml restart pg
dev-pg-up:
	docker compose -f docker-compose.dev.yaml up -d pg
dev-pg-up-recreate:
	docker compose -f docker-compose.dev.yaml up -d --force-recreate pg
dev-pg-stop:
	docker compose -f docker-compose.dev.yaml stop pg
dev-pg-down:
	docker compose -f docker-compose.dev.yaml down pg
help:
	@echo "dev-up: docker compose -f docker-compose.dev.yaml up -d"
	@echo "dev-stop: docker compose -f docker-compose.dev.yaml stop"
	@echo "dev-build: docker compose -f docker-compose.dev.yaml build"
	@echo "dev-down: docker compose -f docker-compose.dev.yaml down"
	@echo "dev-restart: docker compose -f docker-compose.dev.yaml restart"
	@echo "dev-logs: docker compose -f docker-compose.dev.yaml logs"
	@echo "dev-logs-f: docker compose -f docker-compose.dev.yaml logs -f"
	@echo "dev-next: docker compose -f docker-compose.dev.yaml exec next bash"
	@echo "dev-next-logs: docker compose -f docker-compose.dev.yaml logs next"
	@echo "dev-next-build: docker compose -f docker-compose.dev.yaml build next"
	@echo "dev-next-up: docker compose -f docker-compose.dev.yaml up -d next"
	@echo "dev-next-restart: docker compose -f docker-compose.dev.yaml restart next"
	@echo "dev-next-up-recreate: docker compose -f docker-compose.dev.yaml up -d --force-recreate next"
	@echo "dev-next-stop: docker compose -f docker-compose.dev.yaml stop next"
	@echo "dev-next-down: docker compose -f docker-compose.dev.yaml down next"
	@echo "dev-pg: docker compose -f docker-compose.dev.yaml exec pg psql -U diet"
	@echo "dev-pg-logs: docker compose -f docker-compose.dev.yaml logs pg"
	@echo "dev-pg-restart: docker compose -f docker-compose.dev.yaml restart pg"
	@echo "dev-pg-up: docker compose -f docker-compose.dev.yaml up -d pg"
	@echo "dev-pg-up-recreate: docker compose -f docker-compose.dev.yaml up -d --force-recreate pg"
	@echo "dev-pg-stop: docker compose -f docker-compose.dev.yaml stop pg"
	@echo "dev-pg-down: docker compose -f docker-compose.dev.yaml down pg"
	@echo "help: Show this help"