export $(cat api.env | grep ORG_NAME=)

docker-compose -p $ORG_NAME --env-file api.env -f deployment/docker-compose-api.yaml down

docker-compose -p $ORG_NAME --env-file api.env -f deployment/docker-compose-middleware.yaml down
