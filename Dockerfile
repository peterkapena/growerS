FROM node:alpine
# RUN apk update && apk add --no-cache python3

# Create app directory
WORKDIR /app

# #First copy the package files
COPY package*.json ./

RUN npm install
RUN npm install forever -g

# RUN npm install forever
# If you are building your code for production
RUN npm ci --only=production
RUN apk add vim

# Bundle app source
COPY . .

ENV NODE_ENV production
EXPOSE 4000

CMD ["forever", "-l", "forever.log", "-o", "out.log", "-e", "err.log", "-a", "-d", "-n", "10", "./dist/index.js"]

#                           docker build -t grower_management .
#                           docker run -dp 4000:4000 grower_management (optional)
#                           docker tag grower_management  kapenapeter/grower_management
#                           docker push kapenapeter/grower_management

#                           sudo docker pull kapenapeter/grower_management
#                           sudo docker run -dp 4000:4000 kapenapeter/grower_management   