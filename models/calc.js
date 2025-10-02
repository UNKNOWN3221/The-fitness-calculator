const mongoose = require('mongoose')

const calcSchema = new mongoose.Schema({
    Age:{type:Number, required:true},
    Height:{type:Number, required:true},
    Weight:{type:Number, required:true},
    activityLevel:{
        type:String,
        enum:['sedentary', 'light activity','moderate activity', 'very active', 'extra active'],
        required:true
    },
    gender:{
        type: String,
        enum:['male','female']
    },
    createdAt: { type: Date, default: Date.now },
});
const Calc = mongoose.model('calc', calcSchema)
module.exports = { Calc, calcSchema };