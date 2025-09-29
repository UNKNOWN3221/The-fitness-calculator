const mongoose = require('mongoose')

const calcSchema = new mongoose.Schema({
    Age:{type:Number, required:true},
    Height:{type:Number, required:true},
    Weight:{type:Number, required:true},
    activityLevel:{
        type:String,
        enum:['little or no exercise', 'exercise 1-3 times/week','exercise 3-5 times/week', 'daily exercise or intense 3-5 times/week', 'very instense exercise or physical job']
    },
    gender:{
        type: String,
        enum:['male','female']
    },
});
const Calc = mongoose.model('calc', calcSchema)
module.exports = { Calc, calcSchema };