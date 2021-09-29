require('dotenv').config();

//*Imports
const express = require('express');
const dbConnection = require('./db');
const controllers = require('./controllers')
const middleware = require('./middleware')
const cors = require('cors');


//*Instantiation
const app = express();

//*Middleware
app.use(cors({ origin: true }));
app.use(middleware.CORS)
app.use(express.json());

//*Endpoints
//* Test Successful 09/22/2021
app.use('/test', (req, res) => {
  res.send("This is a test message from my server!")
});

app.use('/user', controllers.userController)
app.use('/character', controllers.characterController)
app.use('/blog', controllers.blogController)

try {
  dbConnection
    .authenticate()
    .then(async () => await dbConnection.sync(/* {force: true} */))
    .then(() => {
      app.listen(process.env.PORT, () => {
        console.log(`[Server]: App is listening on ${process.env.PORT}`);
      });
    });
} catch (err) {
  console.log('[Server]: Server Crashed');
  console.log(err);
}
















