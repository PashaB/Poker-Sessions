const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine','ejs')

const MongoClient = require('mongodb').MongoClient
const env = require('./env')

var db

MongoClient.connect('mongodb://'+env.username+':'+env.password+'@ds047146.mlab.com:47146/yoda-quotes', (err, database) => {

	if (err) return console.log(err)
	db = database

	app.listen(3000, function () {
		console.log('listening on 3000')
	})
})

app.get('/', function (req, res) {
	var cursor = db.collection('poker-sessions').find().toArray(function(err, result) {
		if(err) return console.log(err)

		//render index.ejs
		res.render('index.ejs', {sessions: result})
	})
})

app.post('/sessions', (req, res) => {
	console.log('You fookin degen');
	console.log(req.body);

	db.collection('poker-sessions').save(req.body, (err, result) => {
    	if (err) return console.log(err)

    	console.log('saved to database')
    	res.redirect('/')
  })
})

//console.log('test')