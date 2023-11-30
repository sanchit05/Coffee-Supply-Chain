## Script to start Application components 

export $(cat api.env | grep ORG_NAME=)

rm -f certs/ca/.gitkeep certs/peer/.gitkeep certs/orderer/.gitkeep keyStore/.gitkeep wallet/admin/.gitkeep wallet/user/.gitkeep

docker-compose -p $ORG_NAME -f deployment/docker-compose-middleware.yaml up -d

echo "started Scylla, wait for 30 seconds"
sleep 30

SCYLLA_CONTAINER=$ORG_NAME-scylla
echo "creating keyspace and tables in $SCYLLA_CONTAINER" 
docker exec $SCYLLA_CONTAINER cqlsh -f dbScripts/db.sql