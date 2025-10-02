const express = require('express')
const router = express.Router()
const calc = require('../models/calc')
const user = require('../models/user')

// Helper functions

const calculateBMI = (record) => {
 
  return record.Weight/(record.Height/100)**2
}
const calcFatMen = (record) => {
  const bmi= calculateBMI(record)
  return 1.2*bmi+0.23*record.Age-16.2
}
const calcFatwomen = (record) => {
  const bmi = calculateBMI(record)
  return 1.2*bmi+0.23*record.Age-5.4
}
const calcCalories = (record) => {
  const bmrMen = (10*record.Weight)+(6.25*record.Height)-(5*record.Age)+5
  const bmrWomen = (10*record.Weight)+(6.25*record.Height)-(5*record.Age)-161
  if (record.gender == 'male'){
    if (record.activityLevel == 'sedentary'){
      return bmrMen*1.2
    }else if (record.activityLevel == 'light activity') {
      return bmrMen*1.375
    }else if (record.activityLevel == 'moderate activity') {
      return bmrMen*1.55
    }else if (record.activityLevel == 'very active') {
      return bmrMen*1.725
    }else if (record.activityLevel == 'extra active') {
      return bmrMen*1.9
    }
  } else{
      if (record.activityLevel == 'sedentary'){
      return bmrWomen*1.2
    }else if (record.activityLevel == 'light activity') {
      return bmrWomen*1.375
    }else if (record.activityLevel == 'moderate activity') {
      return bmrWomen*1.55
    }else if (record.activityLevel == 'very active') {
      return bmrWomen*1.725
    }else if (record.activityLevel == 'extra active') {
      return bmrWomen*1.9
    }
  }
}
router.get('/', async (req, res) => {
  try {
    currentUser = await user.findById(req.session.user._id)
    res.render('calc/index.ejs',{calc: currentUser.calc,user: currentUser});
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.get('/new', (req, res) => {
    try {
        res.render('calc/new.ejs',{ user: req.session.user});
    } catch(error) {
        console.log(error)
    }
});
router.post('/', async (req,res)=> {
  try{
    currentUser = await user.findById(req.session.user._id);
    currentUser.calc.push(req.body);
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/calc`)
  }
  catch (error) {
    console.log(error)
    res.redirect('/')
  }
});
router.get('/:calcId', async (req, res) => {
  try {
    const currentUser = await user.findById(req.session.user._id);
    const record = currentUser.calc.id(req.params.calcId);
    const bmi = Number(calculateBMI(record).toFixed(1))
    const fatMen = Number(calcFatMen(record).toFixed(1))
    const fatWomen = Number(calcFatwomen(record).toFixed(1))
    const calories = Number(calcCalories(record).toFixed(0))
    res.render('calc/show.ejs', { record, user: currentUser, bmi, fatMen,fatWomen,calories });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});
router.delete('/:calcId', async (req,res) => {
  try{
    currentUser = await user.findById(req.session.user._id);
    const record = currentUser.calc.id(req.params.calcId);
    if (record){
      record.deleteOne();
      await currentUser.save()
    }
    res.redirect(`/users/${currentUser._id}/calc`)
  }
  catch (error){
    console.log(error);
    res.redirect('/')
  }
});
router.get('/:calcId/edit',async (req, res) => {
  try {
    const currentUser = await user.findById(req.session.user._id);
    const record = currentUser.calc.id(req.params.calcId);
    res.render('calc/edit.ejs',{record: record, user: currentUser},)
  }
  catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

module.exports = router;