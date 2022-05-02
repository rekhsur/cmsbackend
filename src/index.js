const express = require("express")
const bodyParser = require("body-parser")
const port = process.env.port||4500
const cors = require("cors")
const app = express()
require("./db/setup")
const Router = require("./router/userrouter")
// use middleware here

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())
app.use(Router)

app.get("/", (req, res) => {
       res.send("Welcome")
})
app.listen(port,()=>{
    console.log(`server is runing ${port}`)
})