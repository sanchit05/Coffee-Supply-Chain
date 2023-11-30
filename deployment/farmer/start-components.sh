export $(cat api.env | grep ORG_NAME=)

echo "starting api"
docker-compose -p $ORG_NAME --env-file api.env -f deployment/docker-compose-api.yaml up -d
