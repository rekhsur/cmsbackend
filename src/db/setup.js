const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/crmbackend2",{
    useNewUrlParser:true,
    autoIndex:false
}).then(() => {
      console.log("connected")
}).catch(() => {
      console.log("not connected")
})