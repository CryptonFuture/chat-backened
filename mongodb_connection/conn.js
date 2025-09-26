const mongoose = require("mongoose");
const { config } = require('dotenv')

config({
  path: '.env'
})


const DB = process.env.MONGO_URL

const connectMongoDb = async () => {
    try {
        const conn = await mongoose.connect(DB, {})
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
         console.error(`MongoDB connection error: ${error.message}`);
         process.exit(1)
    } 
}

module.exports = connectMongoDb

