#! /usr/bin/bash

curl http://localhost:3001/api/persons | json_pp -json_opt pretty,canonical  
curl http://localhost:3001/api/persons/1 | json_pp -json_opt pretty,canonical  
curl -H "Content-Type: application/json" -X POST -d '{"name":"xyz","number":"xyz"}' http://localhost:3001/api/persons | json_pp -json_opt pretty,canonical  
