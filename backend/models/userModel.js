const mongoose = require("mongoose") 

const userSchema = new mongoose.Schema(
    {
        username: {type:String, required:true},
        password: {type:String, required:true},
        email : {type:String, required:true},
        education : {type:String, required:true},
        interests : {type:String, required:true},
        score: {type:Number, default:0}
    },
    {timestamps:true}
)

module.exports = mongoose.model("User", userSchema)