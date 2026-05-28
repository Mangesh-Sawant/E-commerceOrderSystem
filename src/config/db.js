const mongoose =  require("mongoose");

const connectDB = async () =>{
   try {
     mongoose.connect("mongodb://127.0.0.1:27017/learningDB");
     console.log("MongoDB connection successfully");
   }
   catch(err){
   console.log("Mongo dB connection failded");
   console.log(err.message);
   }
};

module.exports = connectDB;