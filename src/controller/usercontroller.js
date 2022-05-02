const User = require("../models/user")

const userPanel = (req, res) => {
    res.send("Welcome to userpanel")
}
//Api for Registration
const signup = async(req, res) => {
    const user = new User({
        userName:req.body.userName,
        Email:req.body.Email,
        password:req.body.password
    })
    try{
        await user.save()
       
        res.status(201).send(user)
    }catch(e){
        res.status(404).send("badrequest")
    }
}
//api for login
const login = async(req, res,)=>{
    try{
        const user = await User.findByCredentials(req.body.Email, req.body.password)
        const token = await user.generateToken()
          res.send({user, token})
    }catch(e){
        res.status(400).send("no user data found")
    }
    
}
//api data from id
const getdata = async(req, res) =>{
    const id = req.params.id
    try{
        const userId = await User.findById(id)
        if(!userId){
            return res.sendStatus(404)
            
        }
        res.send(userId)
        }catch(e){
            res.send("badrequest")
    }
}
//api getdata by name
const getSingleData = async (req, res) =>{
    const Data =( req.body.userName)
    try{
        const userData  = await User.findOne(Data)
        if(!userData){
            return res.SendStatus(404)
        }
        res.send(userData)

    }catch(e){
        res.status(400).send(e)
    }
}
//Api for updation
const update = async(req, res) => {
    const updates = Object.keys(req.body)
    const updateOperation = ["userName","Email","password"]
    const isValidOperation = updates.every((operation) => updateOperation.includes(operation))
    console.log(!isValidOperation)
            if(!isValidOperation){
                return res.status(404).send({
            error:"please provide valid path"
                })
            }
            try{
                updates.forEach((update) => req.user[update] = req.body[update])
                await req.user.save()
                res.send(req.user)
            }catch(e){
                res.status(404).send(e)
            }
    
}
//Api data for remove
  const removeData = async(req, res) =>{
    try{
        await req.user.remove()
        res.send(req.user)
    }catch(e){
        res.status(500).send()
    }
}
// logout api
const logout = async(req, res) =>{
    try{
        req.user.tokens = req.user.tokens.filter((token) => {
            return token .token != req.token
        })
        await req.user.save()
        res.send("logout :you have succesfully logout")
    }catch(e){
         res.Status(500)
}
}

module.exports = {userPanel:userPanel,
    signup:signup,
    getdata:getdata,
    getSingleData:getSingleData,
    login:login,
    update:update,
    removeData:removeData,
    logout:logout
}

