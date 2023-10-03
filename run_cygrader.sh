#!/bin/bash

# List of websites to visit and their ports
WEBSITE_PORTS="ports.txt"

# Check if the input file exists
if [ ! -f "$WEBSITE_PORTS" ]; then
  echo "Input file '$WEBSITE_PORTS' not found."
  exit 1
fi

# Loop through each website URL from the input file
while IFS=: read -r STUDENT WEBSITE || [ -n "$STUDENT" ]; do

  # Run Cypress with the spec file and the website URL
  
  echo "Grading:$STUDENT "
  echo "Hosted on port:$WEBSITE "
  NO_SPACE_PORT=$(echo "$WEBSITE" | tr -d ' ')

  #PASS VALUES [baseUrl, rootUrl, screenshotOnRunFailure]

  npx cypress run --spec cypress/e2e/2/spec.cy.js \
    --env baseUrl="http://localhost:$NO_SPACE_PORT",rootUrl="http://localhost:$NO_SPACE_PORT/",screenshotOnRunFailure=false \
    --browser firefox \
    --headless > grades/"$STUDENT".txt &

done < $WEBSITE_PORTS

# Wait for all Cypress processes to finish
wait

echo "TESTS COMPLETED:"
echo "Review the Grades folder for results"