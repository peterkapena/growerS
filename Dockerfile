FROM node:alpine

RUN apk update && apk add git

RUN git clone https://github.com/peterkapena/grower_management.git grower_management

# Create app directory
WORKDIR /grower_management
# #First copy the package files
# COPY package*.json ./

RUN npm install
# If you are building your code for production
RUN npm ci --only=production

RUN npm run build

# Bundle app source
# COPY . .

EXPOSE 4000

CMD ["NODE_ENV=production", "forever", "start", "-l", "forever.log", "-o", "out.log", "-e", "err.log", "-a", "-d", "-n", "10", "./dist/index.js"]
