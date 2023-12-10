const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        minlength:8,
        required:true
    }
})

const Admin = mongoose.model("admin", adminSchema);

module.exports = Admin;