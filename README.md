WBC Survey
====================
This app is built using Node.js, Express and Mongoose.

Steps to run the app
========================
* Clone the repo
* Run (from the mongo installation directory):
  mongod --dbpath "PATH TO THE DATA FOLDER OF THE REPO" 
  mongo

* Run: npm start

The core routing method logic is present in /routes/index.js

The application is set up with mongoose schemas for user, predictions.

Jade templating engine is used to render HTML content on the client side.


To add a new user, make sure his email ID is present in the userData Array shown in index.js.
If it does, in the sign up page create a new user with his email in the email field and all other user details and submit.

You will be taken to the user's survey page to provide fresh survey answers.


