const express = require('express')
const router = express.Router()
const calc = require('../models/calc')
const user = require('../models/user')
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
    res.redirect(`users/${currentUser._id}/calc`)
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
    res.render('calc/show.ejs', { record, user: currentUser });
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
    res.render('calc/edit.ejs',{record: record},)
  }
  catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

module.exports = router;