#!/bin/bash

echo "Waiting for tree database..."
until docker-compose exec postgres pg_isready -q -d trees
do
  echo "Waiting for tree database..."
done
echo "tree database is ready."

sleep 5s # give it time to reboot

echo "Final database check..."
until docker-compose exec postgres pg_isready -q
do
  echo "Final database check..."
done

echo "All databases ready to go."