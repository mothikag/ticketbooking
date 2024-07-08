const express=require("express")
const mysql=require("mysql")
const bodyparser=require("body-parser")
const { process_params } = require("express/lib/router")

let mail1;
const app=express()

 
const encoder=bodyparser.urlencoded({ extended: true });
app.use(express.urlencoded({ extended: true }));

const con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"dbevent"
})
app.listen(4000,function(){
    console.log("server created") 
})
con.connect(function(error){
    if(error)
    throw error; 
    else{
        console.log("Database connected")
    }
})
app.get("/form1.html",(req,res)=>{
    res.sendFile(__dirname+"/form1.html")
})
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})

app.post("/register",encoder,(req,res)=>{
    console.log("Hii")
    var name = req.body.name;
    var regno =req.body.regno;
    var department =req.body.department;
    var email = req.body.email;
    var eventdate=req.body.eventdate;
    var eventtime=req.body.eventtime;
    var gender=req.body.gender;
    var phno=req.body.phno;

    var sql = "INSERT INTO register (name,rollno,department,email,eventdate,eventtime,gender,phno) VALUES("+con.escape(name)+","+con.escape(regno)+","+con.escape(department)+","+con.escape(email)+","+con.escape(eventdate)+","+con.escape(eventtime)+","+con.escape(gender)+","+con.escape(phno)+")"
    console.log("Registered Sucessfully")
    con.query(sql,function(error,result){
        if(error)
        throw error;
        console.log(result)
        res.redirect('/')
    })
    //res.redirect("/welcome")
})

