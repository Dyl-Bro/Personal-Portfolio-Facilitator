const express = require ('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
require('dotenv/config');
const cors = require('cors');
const api = process.env.API_URL;
const tokenAuthentication = require('./HELPER/jwt');
const errorHandler = require('./HELPER/error-handler');

const projectRouter = require('./ROUTES/projectRoute');
const adminRouter = require('./ROUTES/adminRoute');
const aboutSectionRouter = require('./ROUTES/aboutRoute');
const contactInfoRouter = require('./ROUTES/contactRoute');


app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());
app.options('*', cors());
app.use(tokenAuthentication());
app.use('/UPLOAD-FILES', express.static(__dirname + '/UPLOAD-FILES'))
app.use(errorHandler);

app.use(`${api}/projectRoute`, projectRouter);
app.use(`${api}/adminRoute`, adminRouter);
app.use(`${api}/aboutRoute`, aboutSectionRouter);
app.use(`${api}/contactRoute`, contactInfoRouter);


if(process.env.NODE_ENV !== 'test'){
    mongoose.connect(process.env.CONNECTION_STRING)
    .then(() => {
        console.log(' DATABASE CONNECTION IS READY');
    }).catch((err) => {
        console.log(err);
    });
}



module.exports = app;