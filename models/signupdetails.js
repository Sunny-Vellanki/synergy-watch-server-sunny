const { default: mongoose } = require("mongoose")
const mangoose= require("mongoose")

const signupdata=new mangoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    mobileNumber:{
        type: Number,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    education:{
        type: String,
        required: true
    },

})
const Userdetails=mongoose.model("registeredDetails",signupdata);
module.exports=Userdetails;