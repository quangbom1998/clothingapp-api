const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Import Routes
const userRoute = require('./routes/users');
app.use('/users', userRoute);

const orderRoute = require('./routes/orders');
app.use('/orders', orderRoute);

const productRoute = require('./routes/products');
app.use('/products', productRoute);

const billRoute = require('./routes/bills');
app.use('/bills', billRoute);

//listen to the server
app.listen(3000);