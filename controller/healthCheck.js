const healthCheckController={
     healthCheck(req,res,next){
        const health={
          uptime: process.uptime(),
          resposnsetime: process.hrtime(),
          message: "ok",
          timestamp: Date.now()
        };
        try{
            res.json(health);
        }catch(err){
            next(err);
        }

     }
}
module.exports=healthCheckController