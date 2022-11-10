const express = require("express");
const app = express();
const PORT = 3001;
const mysql = require('mysql');


//all queries related to mysql - creating a connection
const db = mysql.createConnection({
    user: "ghadeer",
    host: "localhost",
    password: "Ghadeer10!",
    database: "PasswordManager",
});


//setting up a route for initial page
app.get("/", (req, res) => {
    res.send('server is up at port 3001');
});




app.listen(PORT, () => {
    console.log("server is up");
});