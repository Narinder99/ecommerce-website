const express = require('express')
const app = express();
require('dotenv').config();
require('./db/mongoose');
const cors = require('cors');

//routes
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const categoryRouter = require('./routes/category');
const productRouter = require('./routes/product');
const braintreeRoutes = require('./routes/braintree');
const orderRoutes = require('./routes/order');

//packages import
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const expressValidator = require('express-validator');


//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());
app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", categoryRouter);
app.use("/api", productRouter);
app.use("/api", braintreeRoutes);
app.use("/api", orderRoutes);


const PORT = process.env.PORT || 8000;

//for development
if (process.env === 'production') {
    app.use(express.static('ecommerce-frontend/build'));
}

app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`)
})
