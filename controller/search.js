const productSchema=require("../model/ProductModel")
const search={
    async searchByQuery(req,res,next){
        const query=req.query.category;
        let products;
        try{
            if(query){ 
             products=await productSchema.findOne({category:query});
            }
            else{
             products=await productSchema.find();
            }
            res.status(200).json(products);
        }catch(err){
            next(err);
        }
    },
}

module.exports=search;