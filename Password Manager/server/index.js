const express = require("express");
const app = express();
const PORT = 3001;

//setting up a route for initial page
app.get("/", (req, res) => {
    res.send('server is up at port 3001');
});


app.listen(PORT, () => {
    console.log("server is up");
});