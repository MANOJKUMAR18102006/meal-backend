const jwt=require("jsonwebtoken")

const auth=(req,res,next)=>{
    const token=req.headers.authorization;
    if(!token){
        res.status(401).json({error:"Unauthorized"})
        return;
    }

    try{
    if(!token || token.length < 10) {
        res.status(401).json({error:"Invalid token format"});
        return;
    }
    const decoded=jwt.verify(token,process.env.SECRET_KEY);
    console.log(decoded)
    req.userData={id:decoded.id,email:decoded.email,role:decoded.role};
    next()
    }catch(err){
        console.log('JWT verification failed:', err.message);
        console.log('Token received:', token);
        res.status(401).json({error:"unauthorized",message:err.message});
        return;
    }
}

module.exports=auth;