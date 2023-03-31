# Post-it-Api-app
A social media API using Javascript which includes validation, authentication and authorization leveraging on bcryptjs, joi, and jsonwebtoken(jwt) technologies


## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Setup](#setup)
* [Usage](#usage)
* [Acknowledgements](#acknowledgements)
* [Contact](#contact)


## General Information
Postit is a social media app that allows users to share postits, connect with friends, and join communities based on shared interests. resources include users. comments, postits.

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
-  "multer": "^1.4.5-lts.1",
-  "jsonwebtoken": "^9.0.0",



## Features
My endpoints/resources:

## Postits resource: /posts
- POST: {baseUrl}/posts = create a new postit
- GET: {baseUrl}/posts = get all postits 
- GET:  {baseUrl}/posts/<id> = get a single postit
- PUT: {baseUrl}/posts/<id> = update or replace a postit 
- DELETE: {baseUrl}/posts/<id> delete a postit 

  
## Comment resource: /comments
- POST: {baseUrl}/api/v1//posts/<postId>/comments = create a comment under the postit with the postit id of <postId> 
- GET: {baseUrl}/api/v1//posts/<postId>/comments/posts/<postId>/comments = Get comments under the postit with the post id of <postId>
- GET:  {baseUrl}/posts/<postId>/comments/<id> = Get a single comment with the comment id of <id> under the postit with the postit id of <postId> 
- PUT: {baseUrl}/posts/<postId>/comments/<id> = Update a single comment with the comment id of <id> under the postit with the postit id of <postId> 
  
## Comment resource: /comments
- POST:  {baseUrl}/posts/<postId>/comments create a comment under the postit with the postit id of <postId>  
- GET: {baseUrl}/posts/<postId>/comments = Get comments under the postit with the post id of <postId>  
- GET: {baseUrl}/posts/<postId>/comments/<id> = Get a single comment with the comment id of <id> under the postit with the postit id of <postId> 
- PUT: {baseUrl}/posts/<postId>/comments/<id> = Update a single comment with the comment id of <id> under the postit with the postit id of <postId>   

## User resource: /users 
- POST: {baseUrl}/users = create a new user
- GET: {baseUrl}/users = get all users
- GET: {baseUrl}/users/<id> = get a single user
- PUT: {baseUrl}/users/<id> = update or replace users
- DELETE: {baseUrl}/user/<id> = delete a user
  
 ## Unique routes
- {baseUrl}/users/@<user-postit-handle> to get user with handle
- {baseUrl}/users/@<user-postit-handle>/posts  to get a users posts


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
  
. input the web url on postman, whcich services as the base url.
. set route and execute request


  
## deployed base link: https://postit-api-social-app.onrender.com
  ## database design: https://dbdesigner.page.link/sFNz5W6PoZa4NzM7A
  
  - soft-delete was implemented by resetting a field called isDeleted which is false at default, to true and when called. Hence, on request of lists of particular resources, a filter is passed to only return all resources except those having the field(isDeleted) to be true.


## Acknowledgements
- This project was inspired by Genesys Tech Hub/Learnable 23
- Many thanks to all who made this possible continue to do so as we build

## Contact
Created by [@Gift Ibe](giftibe62@gmail.com) - feel free to contact me!
