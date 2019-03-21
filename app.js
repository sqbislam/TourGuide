const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

//Load user model
require('./models/User')
require('./models/Idea')

//Load keys.js
const keys = require('./config/keys');
const port = process.env.PORT || 5000; //Set port to local or heroku as required

//Handlebar helpers
const {truncate, stripTags, formatDate, selects, editIcon} = require('./helper/hbs') 

//Passport config
require('./config/passport')(passport)


//Mongoose connect

	//Maps promise to global 
mongoose.Promise = global.Promise;
	//Connect
mongoose.connect(keys.mongoURI,
	{ useNewUrlParser: true})
	.then( () => console.log('Mongo Connected'))
	.catch((err) => console.log(err) )



//Load routes
const auth = require('./routes/auth');
const index = require('./routes/index');
const ideas = require('./routes/ideas')

//init express app
const app  = express();


//Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
 
//Method Override middleware
app.use(methodOverride('_method'))

//Handlebars middleware
app.engine('handlebars', exphbs({
	helpers: {
		truncate: truncate,
		stripTags: stripTags,
		formatDate: formatDate,
		selects: selects,
		editIcon: editIcon
	},
	defaultLayout:'main'
}));
app.set('view engine', 'handlebars')


//Session and Cookie parser middle ware
app.use(cookieParser())
app.use(session({
	secret: 'secret',
  	resave: false,
  	saveUninitialized: false,
}))

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//Set global vars
app.use((req, res, next) => {
	res.locals.user = req.user || null;
	next();
})


//Set static path
app.use(express.static(path.join(__dirname, 'public')))

//Anything that goes to /auth will go to auth route
app.use('/auth', auth);
//Anything that goes to / will go to index route
app.use('/', index);
//Anything that goes to /stories will go to stoies route
app.use('/ideas', ideas);


app.listen(port, ()=> {
	
	console.log(`Server started on port ${port}`);

})

