const express = require('express')
const router = express.Router()
const calc = require('../models/calc')
const user = require('../models/user')
router.get('/', async (req, res) => {
  try {
    res.render('calc/index.ejs');
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.get('/new', async (req, res) => {
  res.render('calc/new.ejs');
});

module.exports = router;