#!/bin/bash
# Simple script to run the Pokemon card server

# Check if Python 3 is available
if command -v python3 &> /dev/null; then
    python3 server.py
elif command -v python &> /dev/null; then
    python server.py
else
    echo "Error: Python 3 is not installed."
    echo "Please install Python 3 to run this server."
    exit 1
fi
