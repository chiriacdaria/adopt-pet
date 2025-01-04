# Use the official Node.js image (v18)
FROM node:18

# Install PostgreSQL client and netcat
RUN apt-get update --fix-missing && apt-get install -y \
    postgresql-client \
    netcat-openbsd \
    && rm -rf /var/lib/apt/lists/*  # Clean up apt cache to reduce image size

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Install nodemon globally
RUN npm install -g nodemon

# Copy the rest of the application code
COPY src/ ./src/
COPY config/ ./config/

# Expose the port the app will run on
EXPOSE 5001

# Set the default command to wait for the database, run migrations, and start the server
CMD ["sh", "-c", "npx sequelize-cli db:migrate && nodemon /app/src/app.js"]
