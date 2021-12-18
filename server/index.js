var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
const db = require('./models')
var app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
//midleware
app.use(cors())

//Router init
const postRouter = require('./Routes/Posts.js')
app.use("/posts",postRouter)

const commentRouter = require('./Routes/Comments.js')
app.use("/comments",commentRouter)

const userRouter = require("./Routes/User.js")
app.use("/user",userRouter)

db.sequelize.sync().then(()=>{
    app.listen(3001,()=>{
        console.log("server listening port 3001")
    })
})
