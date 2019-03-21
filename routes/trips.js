const express = require('express');
const router = express.Router();
const {ensureAuthenticated, ensureGuest} = require('../helper/auth')
const mongoose = require('mongoose');

//Load Idea Model
const User = mongoose.model('users');

router.get('/accom',(req, res) => {
	res.render("trips/accom");
})

router.get('/accom/:acc',(req, res) => {
	let acc = req.params.acc;
	req.app.locals.trip.accom = acc;
	res.render("trips/accom");
})

router.get('/loc/:loc', (req, res) =>{
	let loc = req.params.loc;
	req.app.locals.trip.loc = loc;
	res.redirect("/");
})

router.get('/transport',(req, res) => {
	res.render("trips/transport");
})

router.get('/transport/:trn',(req, res) => {
	let trn = req.params.trn;
	req.app.locals.trip.transport = trn;
	res.render("trips/transport");
})

module.exports = router;
