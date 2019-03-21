const express = require('express');
const router = express.Router();
const passport = require('passport')

//Since in auth.js this equivalent to auth\google
router.get('/google', passport.authenticate('google', {
	scope:['profile', 'email']}));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {

    res.redirect('/dashboard');
  });

router.get('/verify', (req, res) =>{
	if(req.user){
		console.log(req.user)
		res.send('Authorized')
	}
	else{
		res.send('Not Authorized')
		console.log('Not Auth')
	}

});

router.get('/logout', (req, res) =>{
	req.logout();
	res.redirect('/')
});




module.exports = router;
