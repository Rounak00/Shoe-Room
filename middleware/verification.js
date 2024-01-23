const jwt=require("jsonwebtoken");
const JWT_SECRET=require("../config/secrets").JWT_SECRET;

const verifyToken=(req,res,next)=>{
    const acctoken=req.headers.authorization;
    if(!acctoken) return res.json({"msg":"user unauthorized"});
    else{
      const token=acctoken.split(" ")[1];
      jwt.verify(token,JWT_SECRET,function(err,user){
        if(err)return res.json({msg:"Token invalid"});
        req.user=user;
        next();
      })
    }
}


const verifyUser=(req,res,next)=>{
    verifyToken(req,res,() => {
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }else{
            return res.json({ msg: "You are unauthorized" });
        }
    })
}

const verifyAdmin=(req,res,next)=>{
    verifyToken(req,res,() => {
        if(req.user.isAdmin){
            next()
        }else{
            return res.json({ msg: "You are unauthorized" });
        }
    })
}

module.exports={verifyAdmin,verifyUser};