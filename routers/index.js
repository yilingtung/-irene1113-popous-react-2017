var express = require('express'),
    person  = require('../controllers/signup'),
    index = require('../controllers/index'),
    member = require('../controllers/member'),
    post = require('../controllers/post'),
    update = require('../controllers/update'),
    memberInfo = require('../controllers/memberInfo'),
    postInfo = require('../controllers/postInfo'),
    del = require('../controllers/del'),
    updatePost = require('../controllers/updatePost'),
    passport = require('../controllers/passport');
    router  = express.Router(),
    path = require('path');

router.route('/').get(function(req, res) {
  var error = req.flash('error')[0];
  var signup_error = req.flash('signup_error')[0];
  //res.render('index', {login_message : error, signup_message : signup_error});
  res.sendFile(path.join(__dirname, '../index.html'));
});

router.post('/login', passport.authenticate('local', {
  failureRedirect: '/#/?login_error=1&',
  successFlash: 'Welcome!',
  failureFlash: '帳號或密碼錯誤'
}), function(req, res) {
  req.session.idname = req.user.idname;
  req.session._id = req.user.id;
  console.log(req.user.id);
  res.redirect('/member');
});

router.route('/signup').post(person);

router.route('/member').get(member)
                       .put(update);
router.route('/del').get(del);
router.route('/post').post(post)
                     .get(postInfo)
                     .put(updatePost);
router.route('/memberInfo').get(memberInfo);

module.exports = router;
