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


