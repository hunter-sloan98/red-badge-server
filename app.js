require('dotenv').config();
const Express = require('express');
const app = Express();
const dbConnection = require('./db');
app.use(Express.json());


//* Test Successful 09/22/2021
app.use('/test', (req, res) => {
  res.send("This is a test message from my server!")
});
















dbConnection.authenticate()
.then(() => dbConnection.sync())
.then(() => {
  app.listen(3005, () => {
    console.log(`[Server]: App is listening on 3005.`);
  });
})
.catch((err) => {
  console.log(`[Server]: Server crashed. Error = ${err}`);
});