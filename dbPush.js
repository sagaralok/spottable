const mysql = require("mysql");
const bodyParser = require("body-parser");
const express = require("express");
const fs = require("fs");
const app = express();
const csv = require("csv-parser");

app.use(bodyParser.json);

var mysqlConnection = mysql.createConnection({
    host: "localhost",
    user:"root",
    password: "sagaralok",
    database: "spottible",
});
mysqlConnection.connect((err)=>{
    if(!err){
        console.log("Connected");
    }
    else{
        console.log(JSON.stringify(err,undefined,2));
    }
});

mysqlConnection.query("CREATE TABLE registration(email varchar(20),enabled varchar(20),registrationtype varchar(20),usertype varchar(20))",(err,rows,feilds)=>{
    if(!err){
        console.log("Table creation successful");
    }
    else{
        console.log("Error occured");
    }
});


mysqlConnection.query("CREATE TABLE clientinvites(email varchar(20),clientcode varchar(20),usertype varchar(25),accepted varchar(30),role varchar(30),inviter varchar(30))",(err,rows,feilds)=>{
    if(!err){
        console.log("Table creation successful");
    }
    else{
        console.log("Error occured");
    }
});



// -- Add contents of csv1 to corresponding table.
const results1 = [];
fs.createReadStream('registrations.csv')
.pipe(csv({}))
.on('data',(data)=>results1.push(data))
.on('end',()=>{
    // console.log(results.length);
    for(var i =0;i<results1.length;i++){
        mysqlConnection.query(`Insert into registration values('${results1[i].email}','${results1[i].enabled}','${results1[i].registrationtype}','${results1[i].usertype}')`,(err,rows,feilds)=>{
            if(!err){
                console.log("Data is inserted");
            }
            else{
                console.log("Error occured");
            }
        });
    }
})





const results2 = [];
fs.createReadStream('clientinvites.csv')
.pipe(csv({}))
.on('data',(data)=>results2.push(data))
.on('end',()=>{
    for(var i =0;i<results2.length;i++){
        mysqlConnection.query(`Insert into clientinvites values('${results2[i].email}','${results2[i].clientcode}','${results2[i].userType}','${results2[i].accepted}','${results2[i].role}','${results2[i].inviter}')`,(err,rows,feilds)=>{
            if(!err){
                console.log("Data is inserted");
            }
            else{
                console.log("Error occured");
            }
        });
    }
})

