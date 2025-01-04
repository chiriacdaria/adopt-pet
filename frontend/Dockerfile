# Use Node.js base image (updated to 18)
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy frontend package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps  # Ensure that dependencies are installed even with peer conflicts

# Copy all source code files
COPY ./src ./src
COPY ./public ./public

# Install Tailwind CSS and its dependencies (this step is required for tailwind installation)
RUN npm install -D tailwindcss postcss autoprefixer

ENV NODE_OPTIONS=--openssl-legacy-provider

# Expose the port for the frontend server (React runs on port 3000)
EXPOSE 3000

# Start the development server
CMD ["npm", "start"]
