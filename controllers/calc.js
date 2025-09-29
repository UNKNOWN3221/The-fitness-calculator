const express = require('express')
const router = express.Router()
const calc = require('../models/calc')
const user = require('../models/user')
router.get('/', async (req, res) => {
  try {
    currentUser = await user.findById(req.session.user._id)
    res.render('calc/index.ejs',{calc: currentUser.calc,});
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.get('/new', (req, res) => {
    try {
        res.render('calc/new.ejs');
    } catch(error) {
        console.log(error)
    }
});
router.post('/', async (req,res)=> {
  try{
    currentUser = await user.findById(req.session.user._id);
    currentUser.calc.push(req.body);
    await currentUser.save();
    res.redirect(`users/${currentUser._id}/calc`)
  }
  catch (error) {
    console.log(error)
    res.redirect('/')
  }
});

module.exports = router;