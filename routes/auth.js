const express=require("express");
// const Student=require("../models/Student");

const {registerUser,getUser, loginUser}=require("../controllers/authController")
const router=express.Router();

router.post("/register",registerUser)

router.get("/",getUser);

router.post("/login",loginUser);


module.exports=router;