FROM node:alpine
# RUN apk update && apk add --no-cache python3

# Create app directory
WORKDIR /app

# #First copy the package files
COPY package*.json ./

RUN npm install
# RUN npm install forever
# If you are building your code for production
RUN npm ci --only=production

# Bundle app source
COPY . .

ENV NODE_ENV production

CMD ["node", "./dist/index.js"]
