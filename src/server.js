const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

const app = express();

connectDB();


app.use(express.json());

app.use("/api/users",userRoutes);

app.get('/helth',(req,res)=>{
  res.send('helth check');
});

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});