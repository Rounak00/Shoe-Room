const express=require("express");
const PORT=require("./config/secrets").PORT;
const connection=require("./utils/connection")
const errorHandler=require("./middleware/errorHandler");
const routes=require("./routes/routes");
const bodyparser=require("body-parser");
const path=require("path")
const cookieParser=require("cookie-parser")
const app=express();

app.use(express.json());
app.use('/uploads',express.static('uploads'))
global.appRoot= path.resolve(__dirname);
app.use(bodyparser.urlencoded({extended: false}));
app.use(cookieParser);
app.use(routes);
app.use(errorHandler);

// app.get("/",(req,res)=>{
//     res.status(200).send("Hello");
// })

app.listen(PORT,async()=>{
    console.log(`Server running at ${PORT}`);
    await connection();
})