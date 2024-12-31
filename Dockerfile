# Use the official Python 3.10.0 image as the base
FROM python:3.10.0-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the contents of the current directory into the container
COPY . /app

# Expose the port you want the HTTP server to run on
EXPOSE 5500

# Default command to run the Python HTTP server
CMD ["python", "-m", "http.server", "5500"]
