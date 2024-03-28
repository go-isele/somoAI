# Use the official Node.js image as a base image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock to the container
COPY package.json yarn.lock /app/

# Install dependencies
RUN npm install --production

# Copy the rest of the application code to the container
COPY . /app/

# Build the Next.js application
RUN yarn build

# Expose the port on which your Next.js app will run
EXPOSE 3000

# Run the Next.js production server
CMD ["yarn", "dev"]
