const mongoose = require('mongoose')
// require('dotenv').config();
mongoose.connect('mongodb://localhost:27017/ecommerce_services', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex :true
})
    .then(() => {
        console.log('DataBase connected');
    })
    .catch((error) => {
        console.log(error)
    })