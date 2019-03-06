const express = require("express")
let  app = express()
app.use(express.static('public'))
 
app.get('/', (req, res) => res.render("index"));

app.get('/home', (req, res) => {
    res.send("this is home page");
});

app.get('/getbbox', (req,  res) => {
    res.send("hello");
});
app.listen(3000,  () => console.log("Example app listening on port 3000!"));