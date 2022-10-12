const app = require('./app')
const connectDatabase = require('./databases/Database.js')
const dotenv = require('dotenv');
const cloudinary = require('cloudinary');
const cors = require('cors');

app.use(
    cors({
      origin: "http://localhost:3000",
      methods: 'GET,POST,PUT,DELETE',
      credentials: true
    })
)


process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server for handling uncaught exception`)
})

dotenv.config({
    path: 'backend/config/.env'
})

connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


const server = app.listen(process.env.PORT, () => {
    console.log(`server is running in http://localhost:${process.env.PORT}`)
})

//console.log(joe)

// unhandled promise rejection

process.on("unhandledRejection", (err) => {
    console.log(`Shutting down server for ${err.message}`)
    console.log(`Shutting down the server due to unhandled promise rejection`);
    server.close(() => {
        process.exit(1);
    });
})