const nodemailer = require("nodemailer");
const Contact = require('../models/contact');


module.exports.sendMail = async(req,res,next)=>{
    const {contact} = req.body;
    var sender = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'campershive@gmail.com',
          pass: process.env.AUTH
        }
      });
       
      var mail = {
        from: "campershive@gmail.com",
        to: process.env.MAIL,
        subject: contact.subject,
        html:`Name: ${contact.name}<br>
              Email: ${contact.email}<br>
              Description: ${contact.description}`
      };
       
      sender.sendMail(mail);
      next();
}

module.exports.newContact = async(req,res)=>{
    const {contact} = req.body;
    const newContact = new Contact(contact);
    await newContact.save();
    req.flash('success','Thanks, I Will Reach Out To You Soon');
    
    res.redirect('/contact');
}

module.exports.renderForm = async (req,res)=>{
    res.render('contact/index');
}