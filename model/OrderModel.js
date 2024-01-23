const mongoose=require("mongoose");

const orderSchema=new mongoose.Schema({
    userId:{type:String, required:true},
    productId:{type:String, required:true},
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String },
}, {timestamps: true});
module.exports=mongoose.model("Order",orderSchema);