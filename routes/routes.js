const routes=require("express").Router();
const healthCheckController=require("../controller/healthCheck");
const authentication =require("../controller/auth");

const {verifyAdmin,verifyUser}=require("../middleware/verification");
// const categories=require("../controller/categories");
const checkOut=require("../controller/checkOut");
const orders=require("../controller/orders");
const products=require("../controller/products");
const search=require("../controller/search");
const shoppingCart=require("../controller/shoppingCart");
const users=require("../controller/users");
//health check
routes.get("/health",healthCheckController.healthCheck);

//Authentication
routes.post("/user/register",authentication.userRegister);
routes.post("/user/login",authentication.userLogin);
routes.post("/admin/register",authentication.adminRegister);
routes.post("/admin/login",authentication.adminLogin);

//Search
routes.get("/search",verifyUser,search.searchByQuery);


module.exports=routes;
