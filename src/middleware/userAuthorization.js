const User = require("../models/user")
const jwt = require("jsonwebtoken")
const auth = async(req, res, next) => {
    try{
        const token = req.header("Authorization").replace("Bearer","")
        console.log(token)
        const decode = jwt.verify(token, "sumeet dholi")
        const user = await User.findOne({
            _id:decode._id, "tokens.token":token
        })
        if(!user){
            throw new Error()

        }
        req.user = user
        next()

    }catch(e){
        res.status(500).send({
            error:"nothing"
        })
    }
}



module.exports = auth