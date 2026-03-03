const User = require("../models/User");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const registerUser = async (req, res) => {
    try {
        const { name, email, password,role } = req.body;
        const exist=await User.findOne({email})
        if(exist){
            res.status(400).json({error:"User already exist"});
            return;
        }
        const hashpassword=await bcrypt.hash(password,10);
        const user = await User.create({ name, email, password:hashpassword,role });
        res.status(201).json({ message: "User created succesfully",user})
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const getUser = async (req, res) => {
    const users = await User.find()
    console.log(users)
    if (users) {
        res.status(200).json(users);
    } else {
        res.status(404).json({ Error: "user not found" });
    }
}

const loginUser=async(req,res)=>{
    try{
        const {email,password,role}=req.body
        const user=await User.findOne({email});
        if(!user){
            res.status(400).json({error:"User not found"});
            return;
        }
        const ispassword=await bcrypt.compare(password,user.password);
        if(!ispassword){
            res.status(400).json({error:"Invalid password"});
            return;
        }
        if(user.role !== role){
            res.status(403).json({error:`Access denied. This account is registered as ${user.role}`});
            return;
        }
        const token=jwt.sign(
            {id:user._id,email:user.email,role:user.role},
            process.env.SECRET_KEY,
            {expiresIn:process.env.JWT_ExpiresIn}
        )
        res.status(200).json({message:"User Login Succesfully",token,role:user.role});
    }catch(err){
        res.status(400).json({error:err.message});
    }
}

module.exports = { registerUser, getUser,loginUser }