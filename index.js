const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const UserModel = require("./model/Users")

const app = express()

const port = process.env.PORT || 5000

// Middlewares
app.use(cors())
app.use(express.json())


// DB config
mongoose.connect("mongodb://localhost:27017/crud").then(() => console.log("DB is connected"))

// Api Routes
app.post("/createUser", (req,res) => {
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.get("/getUser/:id", (req,res) => {
    const id = req.params.id;
    UserModel.findById({_id:id})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.put("/updateUser/:id", (req,res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate({_id:id}, {
        name:req.body.name, 
        email:req.body.email, 
        age:req.body.age
    })
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.delete("/deleteUser/:id", (req,res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete({_id:id})
    .then(res => res.json(res))
    .catch(err => res.json(err))
})

app.get("/", (req,res) => {
    UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})


// Listener
app.listen(port, () => {
    console.log("Server is Running")
})