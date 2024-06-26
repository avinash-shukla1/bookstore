var express = require('express');
var router = express.Router();
const usermodel= require('./users');
const passport = require('passport');

const localStrategy = require('passport-local').Strategy;

passport.use(new localStrategy(usermodel.authenticate()));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});



router.get('/register', function(req, res, next) {
  res.render('register');
});



router.get('/profile', isloggedin,function(req, res, next) {
  res.render('profile');
});


router.post('/register', function(req, res, next) {
  const data = new usermodel({
  
    username: req.body.username,
    email: req.body.email,
    contact: req.body.username,

})


usermodel.register(data, req.body.password)
.then(function(){
  passport.authenticate("local")(req,res,function() {
    res.redirect('/profile');
  })

})
});



router.post('/login', passport.authenticate("local",{
  failureRedirect: '/register',
  successRedirect: '/profile',
}),function(req, res, next) {
  


});

router.get('/logout',function(req,res){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
})


function isloggedin(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}

module.exports = router;


