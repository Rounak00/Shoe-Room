const express=require("express");
const PORT=require("./config/secrets").PORT;
const connection=require("./utils/connection")
const errorHandler=require("./middleware/errorHandler");
const app=express();
app.use(express.json());


app.use(errorHandler);
app.get("/",(req,res)=>{
    res.status(200).send("Hello");
})

app.listen(PORT,async()=>{
    console.log(`Server running at ${PORT}`);
    await connection();
})