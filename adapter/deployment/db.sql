CREATE KEYSPACE IF NOT EXISTS coffee_supply_chain WITH REPLICATION = { 'class' : 'NetworkTopologyStrategy','DC1' : 1};

CREATE TABLE coffee_supply_chain.user (
    username text,
    email text,
    id text,
    password text,
    address text,
    role text,
    status text,
    PRIMARY KEY (username)
);