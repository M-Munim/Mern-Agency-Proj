// main root file
require('dotenv').config();

const express = require('express');
const app = express();
const authRoute = require('./router/auth-router');
const contactRoute = require('./router/contact-router')
const connectDb = require('./utils/db');
const errorMiddleware = require('./middlewares/error-middleware');

app.use(express.json()); //middleware

// Mount the Router: To use the router in your main express app, u can "mount" it at a specfic URL prefix.
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use(errorMiddleware);

// starting server
const PORT = 5000;

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on : ${PORT}`)
  });
});