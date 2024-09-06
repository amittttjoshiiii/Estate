import express from "express";
import mongoose from "mongoose";
import userRouter from './routes/user.routes.js'
import authRouter from "./routes/auth.routes.js"

mongoose.connect("mongodb://localhost:27017/Joshi_Estate").then(() => {
 console.log("connected to mongoDB")
}).catch((err) => {
 console.log("error :" + err)
})


const app = express();
app.use(express.json());

app.listen(3000, () => {
 console.log("server is running on port 3000!")
})

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);


//Middleware for catching error and showinf them as we dont want to use try catch block for every api call
app.use((err, req, res, next) => {
 const statusCode = err.statusCode || 500;
 const message = err.message || "Internal Server Error"
 return res.status(statusCode).json({
  sucess: false,
  statusCode,
  message
 })
}) 