const mongoose = require ('mongoose');
mongoose.connect('mongodb+srv://prajjwal:A3HGoRdADgFTcCdm@ecommeceapp.2bojlx0.mongodb.net/Sellers');

const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error connecting to Mongodb"));

db.once('open',function(){
    console.log("Successfully connect to the database")
});

module.exports=db;