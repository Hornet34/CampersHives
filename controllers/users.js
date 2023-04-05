const User = require('../models/user');

module.exports.renderRegisterForm = (req,res)=>{
    // renders a register form to the user

    res.render('users/register');
}

module.exports.registerNewUser = async (req,res)=>{
    // sends a post request to register a new user

    try{
        const {username, email, password} = req.body;
        if(username.length<5 || username.length>10){
            req.flash('error','username lenght must be between 5-10 characters');
            return res.redirect('register');
        }
        if(username.length<5){
            req.flash('error','password must be greater than 5 characters');
            return res.redirect('register');
        }
        const user = new User({username,email});
        const registerUser = await User.register(user,password);
        req.login(registerUser, (err)=>{
            if(err) return next(err);
            req.flash('success',`Welcome ${username} to CampersHive`);
            res.redirect('/campgrounds');
        })
    }
    catch(e){
        req.flash('error',e.message);
        res.redirect('register');
    }
}

module.exports.renderLoginForm = (req,res)=>{
    // renders a login form to the user

    res.render('users/login');
}

module.exports.login = (req,res)=>{
    // logs in a user an redirects him to url where he came form

    req.flash('success',`Welcome Back ${req.body.username}`);
    const previousUrl = req.session.returnTo || '/campgrounds';
    const methodRequest = req.session.method;
    delete req.session.returnTo;
    if (methodRequest !== 'GET') {
        delete req.session.method;
        res.redirect(307, previousUrl);
      } else {
        res.redirect(previousUrl);
      }
}

module.exports.logout = async (req,res,next)=>{
    // logs out a user then redirects him to index page
    req.logout((err) =>{
        if(err) return next(err);
        req.flash('success','Successfully Logged Out');
        res.redirect('/campgrounds');
    });
}
