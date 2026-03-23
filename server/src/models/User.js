const mongoose = require('mongoose');
const { Schema } = mongoose;
const userSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    login_name:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    password_hash:{
        type:String,
        quired:true
    },
    display_name:{
        type:String,
        required:true,
        index:true

    },
    avatar_url:{
        type:String,
        default:""
    },
    is_active:{
        type:Boolean,
        default:true
    },
},{
    timestamps:{ 
        createdAt:'created_at',
        updatedAt:'updated_at' 
    }
    

});

module.exports = mongoose.model('User',userSchema); 