const express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");

let app = express();
let counter = 0;

app.use(session({
  secret: 'keepitsecret',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/static"));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// app.get('/', function(req, res) {
//   console.log("Hit default route '/' ");
//
//   // res.send("Hi There User!");
//   res.render('index', {title: "my Express project"});
// })

app.get('/', function(req, res) {
  console.log("Hit default route '/' ");

// does session.count exist? No, created it - give it zero | Yes? then add one to its value
  if(!req.session.count) {
  // No, created it - give it zero
    req.session.count = 0;
    console.log('Count is: ', req.session.count);

  }
  // Yes? then add one to its value
  req.session.count += 1;
  console.log('Count is: ', req.session.count);
  return res.render('index', { counter: req.session.count })
})

app.post('/add', function(req, res) {
  req.session.count += 1;
  console.log('Count is: ', req.session.count);
  return res.redirect('/');
})

app.post('/clear', function(req, res) {
  req.session.count = 0;
  console.log('Count is: ', req.session.count);
  return res.redirect('/');
})

app.listen(8000, function() {
  console.log("Listining on Port:8000");
});
