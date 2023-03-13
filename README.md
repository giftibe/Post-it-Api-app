# Post-it-Api-app
A social media app
Hotel management API using Javascript which includes validation, authentication and authorization leveraging on bcryptjs, joi, and jsonwebtoken(jwt) technologies


## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Setup](#setup)
* [Usage](#usage)
* [Acknowledgements](#acknowledgements)
* [Contact](#contact)


## General Information
- A hotel management api use for determinine the prices, and features of hotel room and at carious prices.
- Helps in creation of hotel rooms, allocating various price and features/names to each room using its unique id
- The purpose of this project to bring in technology in solving the problem of item availables room and price in a hotel

## Technologies Used
-  "node" 
-  "body-parser": "^1.20.1",
-  "cors": "^2.8.5",
-  "dotenv": "^16.0.3",
-  "express": "^4.18.2",
-  "mongoose": "^6.9.1",
-  "morgan": "^1.10.0",
-  "postman",
-  "nodemon",
-  "bcrypt": "^5.1.0"
-  "express-async-handler": "^1.2.0",
-  "joi": "^17.7.1",
-  "jsonwebtoken": "^9.0.0",



## Features
My endpoints/resources can look like this:
Postits resource: /posts
[ POST: create a new postit]  /posts
[ GET: get all postits]  /posts
[ GET: get a single postit] /posts/<id>
[ PUT: update or replace a postit] /posts/<id>
[ DELETE: delete a postit] /posts/<id>

  
Comment resource: /comments
[POST: create a comment under the postit with the postit id of <postId> ] /posts/<postId>/comments
[GET: Get comments under the postit with the post id of <postId> ] /posts/<postId>/comments
[GET: Get a single comment with the comment id of <id> under the postit with the postit id of <postId> ] /posts/<postId>/comments/<id>
[PUT: Update a single comment with the comment id of <id> under the postit with the postit id of <postId> ] /posts/<postId>/comments/<id>

Comment resource: /comments
[POST: create a comment under the postit with the postit id of <postId> ] /posts/<postId>/comments
[GET: Get comments under the postit with the post id of <postId> ] /posts/<postId>/comments
[GET: Get a single comment with the comment id of <id> under the postit with the postit id of <postId> ] /posts/<postId>/comments/<id>
[PUT: Update a single comment with the comment id of <id> under the postit with the postit id of <postId> ] /posts/<postId>/comments/<id>

User resource: /users 
[ POST: create a new user]  /users
[ GET: get all users]  /users
[ GET: get a single user] /users/<id>
[ PUT: update or replace users] /users/<id>
[ DELETE: delete a user] /user/<id>
  
/users/@<user-postit-handle>
/users/@<user-postit-handle>/posts


- use of joi for validation of data request 
- Hashing of user password with bcrypt technology/middleware
- use of jsonwebtoken to control/restrict route access


## Setup
-To use fork repository, ensure node installed installed in your local machine and have npm running also
-Fork repository and run "npm install"; to install all dependencies

## Usage
`npm install`
`npm start ` or `nodemon`
 postman/thunderclient vscode extension
  
## deployed base link https://postit-api.onrender.com
  


## Acknowledgements
- This project was inspired by Genesys Tech Hub/Laearnable 23
- Many thanks to all who made this possible continue to do so as we build

## Contact
Created by [@Gift Ibe](giftibe62@gmail.com) - feel free to contact me!
