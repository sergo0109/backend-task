const connectToServer = require("../DataBase/connectionDB")
const validate = require("uuid-validate")
const users = require("../ORM/modelDefine")

connectToServer.authenticate()


const creatUser = async function(req, res) {
    users.create({
        name : req.body.name,
        userName: req.body.userName,
        email : req.body.email,
        DOB : req.body.DOB,
        phone : req.body.phone,
        password : req.body.password
    })
    .catch(()=>{
        let message
        let checkEmail =  users.findOne({ where: { email : req.body.email} })
        let checkUserName = users.findOne( {where: { userName : req.body.userName} })
        let checkPhone =  users.findOne({ where: { phone : req.body.phone } })
        if(checkEmail){
            message = "email already exists " 
        }
        if(checkUserName){
            if(message){
                message += "userName already exists "
            }else{
                message = "userName already exists "
            }
        } 
        if(checkPhone){
            if(message){
                message += "phone already exists "
            }else{
                message = "phone already exists "
            }
        } 
        return res.send(400,message)
    })
    .then(()=>res.send(201,"User created"))
}


const  getUsers = async function (req,res){
    const allUsers =  await users.findAll()
    if(allUsers != null){
        res.send(302,allUsers)
    }else{
        res.send(404," No info for showing")
    }
}

const getUserById = async function(req,res){
    if(validate(req.params.id)){
        const user = await users.findByPk(req.params.id)
        if(user != null){
            res.send(302,user) 
        }else{
            res.send(404,"user not found")
        }
    }else{
        res.send(404,"user not found")
    }
}


const updateUser= async function(req,res) {
    
    const user = await users.findByPk(req.params.id)
    if(user === null){
        res.send(401,"please,log in again")
    }else{
        let message
        if(req.body.userName && req.body.userName != user.userName){
            let checkUserName = await users.findOne( {where: { userName : req.body.userName} })
            if(checkUserName != null ){
                message = "userName already exists "
            }else{
                user.userName = req.body.userName
            }
        }
    
        if(req.body.email && req.body.email != user.email){
            let checkEmail = await users.findOne( {where: { email : req.body.email} })
            if(checkEmail != null ){
                if(message){
                    message += "email already exists "
                }else{
                    message = "email already exists "
                }
            }else{
                user.email = req.body.email
            }
        }

        if(req.body.phone && req.body.phone != user.phone){
            let checkPhone = await users.findOne( {where: { phone : req.body.phone} })
            if(checkPhone != null ){
                if(message){
                    message += "phone already exists "
                }else{
                    message = "phone already exists "
                }
            }else{
                user.phone = req.body.phone
            }
        }
        if(!message){
            if(req.body.name){
                user.name = req.body.name
            }
            if(req.body.password){
                user.password = req.body.password
            }

            await user.save()
            res.send(200,"User updated")

        }else{
            res.send(400,message)
        }
    }
}

const deleteUser= async function(req,res){
    const user = await users.findByPk(req.params.id)
    if(user != null){
        user.destroy()
        res.send(200,"User deleted")
    }else{
        res.send(401,"please,log in again")
    }  
}
module.exports = {
    creatUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
}










