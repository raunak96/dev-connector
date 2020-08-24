const mongoose = require('mongoose');
const MONGO_URI =require('config').get('mongoURI');

const connectToDB= async()=>{
    try {
        const conn = await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });

        console.log(`Connected to MongoDB at: ${conn.connection.host}`)
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports= connectToDB;