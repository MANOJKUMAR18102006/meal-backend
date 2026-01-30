require('dotenv').config();
const express = require("express");
const app = express();
const AuthRouter=require("./routes/auth")
const cors=require("cors");
const createDB=require("./config/db")
const authMiddleware=require("./middlewares/authMiddleware");
const User = require('./models/User');
const MealRouter=require('./routes/meal');
const FeedbackRouter=require('./routes/feedback');

createDB()

app.use(express.json())      //middleware -> it is a process which is between request and respond

app.use(cors())
app.use((req,res,next)=>{
    console.log(`${req.method} ${req.url}`)
    next();                     //Pass to next middleware/route
})

app.use("/auth",AuthRouter)
app.use("/meal",MealRouter);
app.use("/feedback",FeedbackRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`)
})