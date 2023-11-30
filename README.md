# coffee-supply-chain-hlf
A Coffee Supply Chain Management System built on Hyperledger Fabric

# PreRequirements
-   Install Docker and docker-compose follow the official documentation 
-   Configure your system for MiniFab from the official documentation using this link
    https://github.com/hyperledger-labs/minifabric/blob/main/docs/README.md#prerequisites

# Deploy Hyperledger fabric base network with channel and 5 orgs using minifab
- cd chaincode/deployment
- ./deploy.sh

this will deploy your base netwrk with CA, orderer, orgs, channel, chaincode(installed approved and committed) 

# Deploy Application

go to deployment directory and run the following commands

-   ./start_all_prereq.sh
-   ./start_all_component.sh

it will set all the environment variables, deploy Sylla DB and will deploy the application for every organization.
Admin users will be created automatically once the application is started
To Register and Enroll the users use /register api for the following organization

# Use Postman Collections and Environment file to login and start using the functions (the flow to use postman request is described below). Postman Collection and environment files are available in the same directory

-   Login Farmer (this request will login to the farmer application)
-   Grow Batch (this request will create a ticket on ledger which means that the farmer has grown the batch which is ready to be picked by supplier)
-   Login Supplier (this request will loging to the supplier application)
-   Supplier Batch (this request will create an asset which will store supplier and batch details )
-   Login Processor (this request will login to the Processor application)
-   Process Batch (this post request will update the details of processing mill for coffee)
-   Login Roaster (this request will login to the Roaster application)
-   Roaster Batch (this request will update the details for roasting type of coffee)
-   Login Retailer (this request will login to the Retailer application)
-   Retailer Batch (finally this request will update the details of Retailer will distribute it further for user consumption)



