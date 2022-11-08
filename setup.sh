#!/bin/bash

cp .env.example .env

docker-compose down --volumes

docker-compose -f docker-compose.yml --env-file .env up
