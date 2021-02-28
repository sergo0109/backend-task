const client =require("../DataBase/connectionDB")

client.connect()
const creatUser = async function(req, res) {
    let name = req.body.name,
    username = req.body.username,
    email = req.body.email,
    age=req.body.age
    phone = req.body.phone,
    pass = req.body.pass
    const usercheckEmail= await client.query("select * from users where email = $1",[email])
    const usercheckUsername= await client.query("select * from users where username = $1",[username])
    const usercheckPhone= await client.query("select * from users where phone = $1",[phone])
    if(!usercheckEmail.rows[0] && !usercheckUsername.rows[0] && !usercheckPhone.rows[0]){
        const user = await client.query("insert into users values($1,$2,$3,$4,$5,$6)", [name,username,email,age,phone,pass])
       res.send("User created")
    }else{
        let message
        if(usercheckEmail.rows[0]){
            message = "email already exists"
        }
        if(usercheckUsername.rows[0]){
            message? message += " username already exists" : message = "username already exists"
        } 
        if(usercheckPhone.rows[0]){
            message? message += " phone already exists" : message = "phone already exists"
        }

        res.send(message)
    }
}

const  getUsers = async function (req,res){
    const users = await client.query("select * from users")
    res.send(users.rows)
}

const getUserById= async function(req,res){
    const id= req.params.id
    const user= await client.query("select * from users where id=$1",[id])
    res.send(user.rows[0])

}
const updateUser= async function(req,res){
    const id = req.params.id
    const user = await client.query("select * from users where id = $1",[id])
    let message
    if(req.body.email && req.body.email != user.rows[0].email){
        const userEmail = await client.query("select * from users where email = $1",[req.body.email]);
        if(userEmail.rows[0]){
        message = "email already exists"
        }
    }
    if(req.body.phone && req.body.phone != user.rows[0].phone){
        const userPhone = await client.query("select * from users where phone = $1",[req.body.phone]);
        if(userPhone.rows[0]){
        message? message += " phone already exists" : message = "phone already exists"
        }
    }
    if(message){
        return res.send(message)
    }
    let name = req.body.name || user.rows[0].name,
    email = req.body.email || user.rows[0].email,
    phone = req.body.phone || user.rows[0].phone,
    pass = req.body.pass || user.rows[0].pass 
    await client.query("update users set name = $1, email = $2, phone = $3 , pass = $4 where id = $5 ",[name,email,phone,pass,id])
    res.send("User updated")
}

const deleteUser= async function(req,res){
    const id= req.params.id
    await client.query("delete from users where id = $1",[id])
    res.send("User deleted")
}
module.exports = {
    creatUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
}
