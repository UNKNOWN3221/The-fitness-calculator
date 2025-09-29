const mongoose = require('mongoose')

const calcSchema = new mongoose.Schema({
    Name:{type:String, required:true},
    Age:{type:Number, required:true},
    Height:{type:Number, required:true},
    Weight:{type:Number, required:true},
    activityLevel:{
        type:String,
        enum:['sendentary', 'light activity','moderate activity', 'very active', 'extra active']
    },
    gender:{
        type: String,
        enum:['male','female']
    },
});
const Calc = mongoose.model('calc', calcSchema)
module.exports = { Calc, calcSchema };