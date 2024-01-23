const userSchema=require("../model/UserModel");
const CryptoJs=require("crypto-js");
const CRYPTO_SECRET=require("../config/secrets").CRYPTO_SECRET;
const JWT_SECRET=require("../config/secrets").JWT_SECRET;
const jwt=require("jsonwebtoken");
const authentication={
       async userRegister(req,res,next){
            const newUser=new userSchema({
               name:req.body.name,
               email:req.body.email,
               address:req.body.address,
               password: CryptoJs.AES.encrypt(req.body.password,CRYPTO_SECRET).toString(),
            });
            try{
                await newUser.save();
                res.status(201).json("profile created, Please log in");
            }catch(err){next(err);}

       },
       async userLogin(req,res,next){
           const {email,password }=req.body;
           try{
            const isExist=await userSchema.findOne({email:email});
            if(!isExist){ res.status(404).json("User not found");}

            const hashPassword=CryptoJs.AES.decrypt(isExist.password,CRYPTO_SECRET);
            const originalPassword=hashPassword.toString(CryptoJs.enc.Utf8);

            originalPassword !== password && res.statsus(401).json("Wrong password");


            const generateToken= jwt.sign({
                id:isExist._id,
                isAdmin:isExist.isAdmin
            },JWT_SECRET)
            res.status(200).json({
                "msg": "Login successfully" ,
                "accessToken":generateToken
            });

           }catch(err){
            next(err);
           }    
       },
       async adminRegister(req,res,next){
        const newUser=new userSchema({
            name:req.body.name,
            email:req.body.email,
            address:req.body.address,
            isAdmin:true,
            password: CryptoJs.AES.encrypt(req.body.password,CRYPTO_SECRET).toString(),
         });
         try{
             await newUser.save();
             res.status(201).json("profile created, Please log in");
         }catch(err){next(err);}
       },
       async adminLogin(req,res,next){
        const {email,password}=req.body;
        try{
         const isExist=await userSchema.findOne({email:email});
         if(!isExist || !isExist.isAdmin){ res.status(404).json("admin not found");}

         const hashPassword=CryptoJs.AES.decrypt(isExist.password,CRYPTO_SECRET);
         const originalPassword=hashPassword.toString(CryptoJs.enc.Utf8);

         originalPassword !== password && res.statsus(401).json("Wrong password");


         const generateToken= jwt.sign({
             id:isExist._id,
             isAdmin:isExist.isAdmin
         },JWT_SECRET)
         res.status(200).json({
             "msg": "Login successfully" ,
             "accessToken":generateToken
         });

        }catch(err){
         next(err);
        }
       }
}
module.exports=authentication;