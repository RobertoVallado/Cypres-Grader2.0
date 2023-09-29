#!/bin/bash

#NOTE: run this file with the parameter: {FOLDER_WITH_REPOS}/{NAME_PORT_FILE}.txt

# Check if an input file is provided
if [ $# -eq 0 ]; then
  echo "Usage: $0 <input_file>"
  exit 1
fi

input_file="$1"
ports_file="ports.txt"

# Initialize ports file or clear its content if it exists
> "$ports_file"

# Iterate through the lines in the input file
while IFS=, read -r name port; do
  # Append the port to the ports file for Cypress testing
  echo "$name: $port" >> "$ports_file"
done < "$input_file"

echo "Files and ports generated:"
echo "Ports file ($ports_file)"
