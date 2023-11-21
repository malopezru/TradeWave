
# Use an official Node runtime as a parent image
FROM node:lts

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and yarn.lock files to the container
COPY package.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn install --frozen-lockfile

# Copy the rest of the application code to the container
COPY . .

# Build the application
RUN yarn build

# Expose port 3000 for the application
EXPOSE 3000

