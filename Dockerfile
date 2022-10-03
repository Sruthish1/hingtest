FROM node:14.16.0

# Create app directory
WORKDIR /usr/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
RUN npm ci --quiet

# Copy the source code
COPY . .

# Build the app
RUN npm install && npm run build
