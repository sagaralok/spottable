<div align="center">

## **Spottabl Backend Challenge**

</div>

## [Drive link](https://drive.google.com/drive/folders/1obMP-1NJFEorizMiyhBoM4gJazG9qPmV?usp=sharing) (In case report is not available)
## [Gist](https://gist.github.com/sagaralok/8da2562604b9768807e8e89565063f7c) link

## Table of Contents
* [Project Structure](#project-structure)
* [Starting Application](#starting-application)
* [Problem Solving Approach](#problem-solving-approach)
* [Libraries Used](#libraries-used)

## Project Structure

- `main.js` - Main file to process queries and API routes.
- `dbPush.js` - File to fetch data from csv and to push into database. Run this only one time to fetch and save data for query.

## Library and setup to run Application

- Node.JS and MySQL and node package manager (NPM) must be installed.
- initialise the directory with `npm init`.
- Install required libraries `npm install express mysql body-parser csv-parser`.
- First run node dbPush.js `node dbPush.js`, it will fetch the given csv's and push it into database.  
- For all 4 tasks i have made routes seperately, run at localhost 3000.

### Development

1. Create table using `mysqlConnection.query("CREATE TABLE...`.
2. Fetch data from csv using  `fs.createReadStream('registrations.csv')`
3. Push data into database using `Insert into` clause with query.
4. In main.js file 4 routes are for tasks. These are executable on localhost with dbname and password `http://localhost:3000/task1`
5. Run application using `node main.js`.

- Route for task1 : 
    ```
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

## Problem Solving Approach

### Asynchronous Programming

As it's mentioned in the the challenge that we need to fetch data from csv and push into the database, Asynchronous routes the server should be able to process millions of requests and responses in a timely manner, that's why I have used the javascripts `async`, this is the fastest and most async efficient framework for building APIs as the database connector to process requests as fast as possible.

### Database

I have used `MySQL` as the database to store the submissions. It's a fast and reliable `SQL` database that can be used to store millions of records. The main reason behind picking up this is to use the simplicity of the as database adapter for speed.
For both csv `clientinvites` and `registrations` i created two table in the mysql database with the same name as mentioned in the csv for better explanation.


```SQL
Table: registration
Columns:
email varchar(20) 
enabled varchar(20) 
registrationtype varchar(20) 
usertype varchar(20)
```

### Background Task

On all routes like  `http://localhost:3000/task4` endpoint, I have executed query to fetch the data from database which takes time and promise is returned as callback. This improves the response time as the application doesn't wait for the confirmation message to be sent.


## Assumptions

- I have assumed that the `email` in registration and `inviter` in clientinvites is the primary key for the submission of last subtask.


## Libraries Used
- Express
- Node.JS
- MySQL
- body-parser
- csv-parser
