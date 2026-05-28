const express = require("express");

const router = express.Router();

router.get("/",async(req,res)=>{
    res.status(200).json({
        message: "This is the product"
    });
})

router.post("/products", async(req,res)=>{
    const {title,price,description,stock} = req.body;
    return res.json({title,price,description,stock});
});

module.exports = router;;