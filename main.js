const mysql = require("mysql");
const express = require("express");
const app = express();

var mysqlConnection = mysql.createConnection({
    host: "localhost",
    user:"root",
    password: "sagaralok",
    database: "spottible",
});
mysqlConnection.connect((err)=>{
    if(!err){
        console.log("Database Connected");
    }
    else{
        console.log(JSON.stringify(err,undefined,2));
    }
});
 

// // In task1 the api should return number of users of spottabl and flexmoney from registration.csv. 
app.get('/task1',async (req,res)=>{
    try{
        mysqlConnection.query("SELECT count(email) as 'Number of users on spottabl' from registration",(err,rows,feilds)=>{
            if(!err){
                console.log(rows);
                res.send(rows)
            }
            else{
                console.log("Error occured");
            }
        });
    }
    catch{
        console.log("Eror");
    }
})

app.get('/task2',async (req,res)=>{
    try{
        mysqlConnection.query("SELECT count(email) as 'Number of users invited from spottabl' from clientinvites",(err,rows,feilds)=>{
            if(!err){
                console.log(rows);
                res.send(rows)
            }
            else{
                console.log("Error occured");
            }
        });
    }
    catch{
        console.log("Eror");
    }
})


app.get('/task3',async (req,res)=>{
    try{
        mysqlConnection.query("SELECT count(email) as 'Number of users who have accepted invite' from clientinvites where accepted='true'",(err,rows,feilds)=>{
            if(!err){
                console.log(rows);
                res.send(rows)
            }
            else{
                console.log("Error occured");
            }
        });
    }
    catch{
        console.log("Eror");
    }
})

app.get('/task4',async (req,res)=>{
    try{
        mysqlConnection.query("SELECT count(*) as 'Number of users invited from spottabl user' from clientinvites c JOIN registration r ON c.inviter=r.email",(err,rows,feilds)=>{
            if(!err){
                console.log(rows);
                res.send(rows)
            }
            else{
                console.log("Error occured");
            }
        });
    }
    catch{
        console.log("Eror");
    }
})



app.get('/',(req,res)=>{
    res.send("Testing with empty route")
})

app.listen(3000,()=>{
    console.log("Server started");
})