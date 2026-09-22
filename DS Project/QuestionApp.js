const express = require('express');
const app = express();
const mysql = require('mysql2');
const path = require('path');

let conStr = {} // has the local information and container information to gain access to database
conStr.host = process.env.MYSQL_SERVICE || 'localhost' 
conStr.user = process.env.MYSQL_USER || 'root'
conStr.password = process.env.MYSQL_PASSWORD || 'root'
conStr.database = process.env.MYSQL_DATABASE || 'questions'
const PORT = process.env.QUESTION_PORT || 3000

const Database = mysql.createConnection(conStr) // creates connection with database

Database.connect((err) => { // makes sure that the database is connected before an API is called
    if(err) {
        console.log(`Connection to the database has failed ${err.message}`)
        //process.exit(1)
    }
    else {
        console.log(`Successful connection to the database`)
    }
})

app.use(express.static(path.join(__dirname, '/Question/Html'))) // {
app.use(express.static(path.join(__dirname, '/Question/Css'))) //     so the program knows were to find the frontend when the app is launched
app.use(express.static(path.join(__dirname, '/Question/Java'))) // }

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'Question', 'Html', 'FrontEnd.html')) // the API default homescreen when user boots up the website
})

app.get("/question/any", (req, res) => { // uses the API call to request a random question from the database with a random question type

    let count = 1; // default number of questions
    if(req.query.count > count) { // if the user asks for more questions the defualt is overridden
        count = req.query.count
    }
    const sql = `SELECT * FROM tbl_questions inner join tbl_type on tbl_questions.type_ID = tbl_type.ID order by rand() limit ${count}`
    Database.query(sql, (err, results) => {
        if(err) {
            console.log(`Error Detected within database: ${err.message}`) // if the database has an error it will output an error message
        }
        else {
            res.json(results) // produces the result
        }
    })
})

app.get("/question/:category", (req, res) => { // requests a random question from the database with the selected category
    let type = req.params.category; // the category that has been selected
    let count = 1;
    if(req.query.count > count){
        count = req.query.count
    }
    const sql = `select * from tbl_questions inner join tbl_type on tbl_questions.type_ID = tbl_type.ID where tbl_type.Type = '${type}' order by rand() limit ${count}`
    if(type == undefined) return res.sendStatus(404); // if the type of category is not found it will display an error message

    Database.query(sql, (err, results) => {
        if(err) {
            console.log(`Error Detected within database: ${err.message}`) // if the database has an error it will output an error message
        }
        else {
            res.json(results)
        }
    })
})

app.get("/categories", (req, res) => { //Uses API to get all categories from the database
    
    const sql = `select Type from tbl_type`

    Database.query(sql, (err, results) => {
        if(err) {
            console.log(`Error Detected within database: ${err.message}`) // if the database has an error it will output an error message
        }
        else {
            res.json(results)
        }
    })
})

app.listen(PORT, () => console.log(`Found port ${PORT} beginning to Monitor`)) // listens to the port to the see if it is open
                                                                               // and sends a feedback message if it is found