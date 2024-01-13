FROM  node:18
WORKDIR /usr/src/app


COPY package*.json ./

RUN npm install

RUN npm install -g typescript nodemon ts-node

COPY . .

RUN tsc

EXPOSE 3000


CMD ["nodemon","-x","ts-node","src/index.ts"]
