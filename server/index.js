import express from "express";
import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/joshi_Estate").then(() => {
 console.log("connected to mongoDB")
}).catch((err) => {
 console.log("error :" + err)
})

const app = express();
app.listen(3000, () => {
 console.log("server is running on port 3000!")
})