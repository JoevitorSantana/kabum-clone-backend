const express = require('express')
const app = express();
const ErrorHandler = require('./middleware/error');
const cookieParser = require("cookie-parser");
const path = require('path');
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true,limit:"50mb"}));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(fileUpload({useTempFiles: true}));
  
const product = require('./routes/ProductRoute');
const user = require("./routes/UserRoutes");
const order = require('./routes/OrderRoutes');
const payment = require('./routes/PaymentRoute');
const cart = require('./routes/WishlistRoute');

app.use('/api/v2',product);
app.use('/api/v2',user);
app.use('/api/v2',order);
app.use('/api/v2',payment);
app.use('/api/v2',cart);


app.use(express.static(path.join(__dirname,"../client/build")));

app.get("*",(req,res) =>{
    res.sendFile(path.resolve(__dirname,"../client/build/index.html"));
});

app.use(ErrorHandler)

module.exports = app