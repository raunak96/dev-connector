const express= require('express');
const connectToDB = require('./config/db');

const app=express();
connectToDB();

app.use(express.json({extended:false}));

app.get("/",(req,res)=>res.send("Hey"));

// define Routes
app.use("/api/users",require("./routes/users"));
app.use("/api/auth",require("./routes/auth"));
app.use("/api/profile",require("./routes/profile"));
app.use("/api/posts",require("./routes/posts"));

const PORT=process.env.PORT || 8080;

app.listen(PORT,()=>console.log(`Server running in ${require('config').get('nodeENV')} at port ${PORT}`));