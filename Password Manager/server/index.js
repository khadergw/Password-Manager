const express = require("express");
const app = express();
const PORT = 3001;
const mysql = require('mysql2');
const cors = require('cors');

const {encrypt, decrypt} = require('./EncryptionHandler');

//to allow us to connect to two servers (frontend and backend) on the same computer
app.use(cors());

//to be able to receive json on the backend
app.use(express.json());

//all queries related to mysql - creating a connection
const db = mysql.createConnection({
    user: "ghadeer",
    host: "localhost",
    password: "Ghadeer10!",
    database: "PasswordManager",
});


//setting up an accessible route allows to insert the data in mysql
app.post("/addpassword", (req, res) => {
   //access the body(values in frontend) through req and pass them to backend
   const {title, website, username, password} = req.body
    
   //encrypt the password before inserting it
   const hashedPassword = encrypt(password);
   //passing sql query (insert) to insert the data in the db table
   db.query("INSERT INTO passwords (title, website, username, password, iv) VALUES (?,?,?,?,?)", [title, website, username, hashedPassword.password, hashedPassword.iv],
   (err, result)=> {
    if(err) {
        console.log(err);
    } else {
        res.send("Success");
    }
   })

});

//setting up a route for initial page
app.get("/", (req, res) => {
    res.send('server is up at port 3001');
});

//route for showing the passwords
app.get("/showpasswords", (req, res) => {
    db.query("SELECT * FROM passwords;", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});




app.listen(PORT, () => {
    console.log("server is up");
});