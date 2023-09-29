#!/bin/bash

# Check if an input file is provided
if [ $# -eq 0 ]; then
  echo "Usage: $0 <input_file>"
  exit 1
fi

input_file="$1"
ports_file="ports.txt"

# Initialize ports file or clear its content if it exists
> "$ports_file"

# Create an empty results folder
mkdir results

# Iterate through the lines in the input file
while IFS=, read -r name port; do

  echo "$port"

  # Create a file on the results folder with the name and write the port number into it
  echo "$port" > results/"$name"
  
  # Append the port to the ports file for Cypress testing
  echo "$name: $port" >> "$ports_file"
done < "$input_file"

echo "Files and ports generated:"
ls -l
echo "Ports file ($ports_file):"
cat "$ports_file"
