const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        trim:true,
    },
   Email:{
            type:String,
            unique:true,
            required:true,
            trim:true,
            required:true,
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error("email is not correct")
                }
            }
   },

   
    
    password:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
         validate(value){
             if(value.toLowerCase().includes("password")){
                 throw new Error("in password should not include'password'")
             }
         }
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
   

})

userSchema.methods.toJSON = function ()
{
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    delete userObject.userProfile
  
    return userObject
}

 userSchema.methods.generateToken = async function(){
    const user = this
    const token = jwt.sign({
        _id: user._id.toString()}, process.env.JWT_SECRET)
        
        user.tokens = user.tokens.concat({
            token
        })

        await user.save()
        return token

}
userSchema.statics.findByCredentials = async(Email, password)=>{
    const user = await User.findOne({Email})
    
    if(!user){
        throw new Error("unable to find user")
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        throw new Error("unable to login")
    }
    return user
}

userSchema.pre("save",async function(next){
    const user = this
    if(user.isModified("password")){
             user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const User = mongoose.model("user",userSchema)
module.exports = User