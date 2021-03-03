const express = require('express')
const app = express()
const userService = require("./usersService/endpoints")

app.listen(2000)
app.use(express.json())




app.post('/reg', (req,res)=>{
    userService.creatUser(req, res)
})

app.get('/users',(req,res)=>{
    userService.getUsers(req,res)
})

app.get('/user/:id',(req,res)=>{
    userService.getUserById(req,res)
})

app.put('/user/:id',(req,res)=>{
    userService.updateUser(req,res)
})

app.delete('/user/:id',(req,res)=>{
    userService.deleteUser(req,res)
})

