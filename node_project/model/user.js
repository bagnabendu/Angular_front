const mongoose=require('mongoose')
const Schema=mongoose.Schema
const Userschema=new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }, 
    // confirmpassword:{
    //     type:String,
    //     required:true
    // }
})
const UserModel=new mongoose.model("user",Userschema)
module.exports=UserModel