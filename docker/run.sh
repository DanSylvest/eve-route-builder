#!/bin/sh

# Exit immediately if a command exits with a non - zero status
set - e

# Print all executed commands to the terminal
set - x

# Start the Node.js application
exec node /usr/src/app/dist/main.js
