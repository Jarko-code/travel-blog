## Deploy project

git clone https://github.com/Jarko-code/travel-blog.git

npm install

## For server deploy

cd server
npm install
npm install -g nodemon

download and install https://www.mongodb.com/try/download/shell,
open compass -> add new connection -> change URI field to mongodb://localhost:27017 and name field to travel-blog -> save&connect - you should see connected DB

nodemon app.js

## Run app

From root run npm run dev - it will run server and client together

## DB test

install this extension for Visual studio code https://marketplace.visualstudio.com/items?itemName=Postman.postman-for-vscode

register or login, it`s free

ask me for invitation and you will get API tests

## Seeds

if you want to seed the DB, from root run npm run seed
the output should be like this: (depends on collections count)

MongoDB Connected
Database is connected and ready.
Indexes removed from collection: users
Indexes removed from collection: subscriptions
All indexes have been removed from all collections.
All seeds have been successfully added to the database.
MongoDB disconnected.
