const express = require("express")
let  app = express()
app.use(express.static('public'))

app.get('/', (req, res) => res.render("index"));


app.get('/getBoundingBox', (req,  res)=> res.send())
app.listen(3000,  () => console.log("Example app listening on port 3000!"));