
## Starts the platform without installing locally
start:
	docker-compose up -d postgres
	chmod u+x ./bin/wait-for-postgres.sh
	./bin/wait-for-postgres.sh
	docker-compose up -d

## Stops the platform
stop:
	docker-compose stop

## Builds containers
build:
	docker-compose build --no-cache

## Stops containers, deletes database files
clean:
	docker-compose down --remove-orphans --rmi local
	rm -rf ./tmp

## Rebuilds and restarts containers
restart:
	docker-compose up -d --build

## See the web logs
logs:
	docker-compose logs -f web

## Test E2E
test-e2e:
	docker-compose exec web npm run test:e2e
