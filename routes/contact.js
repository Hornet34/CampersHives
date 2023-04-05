const express = require('express');
const router = express.Router({mergeParams: true});
const {validateContact} = require('../middleware');
const contact = require('../controllers/contact');


const catchAsync = require('../errorHandler/catchAsync');

router.get('/',catchAsync(contact.renderForm))

router.post('/',validateContact, contact.sendMail, catchAsync(contact.newContact))

module.exports = router;