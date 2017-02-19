var Person = require('../models/person');
var LocalStrategy = require('passport-local').Strategy;
var passport = require('passport');

passport.appCallback = function(callback){
  // Authentication
  passport.use(
    new LocalStrategy(
      {},
      function(username, password, done) {
        console.log(4);
        Person.findOne({ username: username }, function(err, user) {
          if (err) { console.log(1);return done; }
          if (!user) {
            //帳號
            console.log(2);
            return done(null, false, { message: 'Incorrect username.' });
          }
          if (!user.validPassword(password)) {
            //密碼
            console.log(3);
            return done(null, false, { message: 'Incorrect password.' });
          }
          //正確
          console.log(5);
          return done(null, {
            username: username,
            idname: user.idname,
            id: user._id
          });
        });
      })
  );

  passport.serializeUser( function(user, done) {
    return done(null, user);
  });

  passport.deserializeUser( function(user, done) {
    return done(null, user);
  });

  passport.c = passport.authenticate('local', {
      failureRedirect: '/#/?login_error=1&',
      successFlash: 'Welcome!',
      failureFlash: '帳號或密碼錯誤'
  });

  passport.success= function(req, res) {
    req.session.idname = req.user.idname;
    req.session._id = req.user.id;
    console.log(req.user.id);
    res.redirect('/member');
  }

  callback();
}

module.exports = passport;
