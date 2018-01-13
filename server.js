const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

app.set('view engine', 'hbs'); // view engine - движок вьюхи, указываем что это hbs - handlebars
app.use(express.static(__dirname + '/public')); // для предоставления статичного контента,
// т е пишем http://localhost:3000/help.html и получаем наш html
hbs.registerPartials(__dirname + '/views/partials');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err)=>{}); // server.log is created automatically
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', { // рендерим контент из home.hbs по адресу http://localhost:3000/
    pageTitle: 'Home Page', // это переменные
    welcomeMessage: 'Welcome to my website' // это переменные
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

// /bad - send back json with errorMessage
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(3000, () => {
	console.log('Server started and listening on port 3000!');
});