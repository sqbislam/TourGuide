const GoogleStrategy = require('passport-google-oauth20').Strategy;

const mongoose = require('mongoose');
const key = require('./keys');

//Load user Model
const User = mongoose.model('users');

module.exports = function(passport){
	passport.use( new GoogleStrategy({
		clientID: key.googleClientID,
		clientSecret: key.googleClientSecret,
		callbackURL: '/auth/google/callback',
		proxy: true
	}, (accessToken, refreshToken, profile, done) => {
		
		//console.log(accessToken, profile);

		const image = profile.photos[0].value.substring(0, profile.photos[0].value.indexOf('?'));
		console.log(image);

		//Make user object to store in DB
		const newUser = {
			googleID: profile.id,
			firstName: profile.name.givenName,
			lastName: profile.name.familyName,
			email: profile.emails[0].value,
			image: image

		}
		console.log(`>>>>>New User :${newUser.googleID}, ${newUser.email}`);

		//Check for existing user
		User.findOne({
			googleID: profile.id
		}).then(user => {
			if(user){
				//Return user
				done(null, user);
			}
			else{
				//Create User
				new User(newUser).
				save().
				then(user => done(null, user))
			}
		})

		})
	);

	passport.serializeUser((user,done) => {
		done(null, user.id)
	})


	passport.deserializeUser((id,done) => {
		User.findById(id).then(user => done(null, user));
	})
}