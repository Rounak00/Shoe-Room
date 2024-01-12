const mongoose=require("mongoose");
const DBURL=require("../config/secrets").DB_LINK;

const connection=async()=>{
    try{
       await mongoose.connect(DBURL);
       console.log("DB Connected ! ! !");
    }catch(err){
        console.log("DB Connection error in util/Connection.js",err.message)
    }
}

module.exports=connection;