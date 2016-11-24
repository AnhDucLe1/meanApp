//IMPORT EXPRESS MODULE
var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('resume', ['resume']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/resume', function (req, res) {
  console.log('I received a GET request');

  db.resume.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});


app.post('/resume', function (req, res) {
  console.log(req.body);
  db.resume.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.delete('/resume/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.resume.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/resume/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);

  db.resume.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/resume/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.type);
  if(req.body.type == "edu")
  {
  	 db.resume.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {school: req.body.school, degree: req.body.degree, last_year: req.body.last_year}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
  }
 if(req.body.type == "skill")
  {
  	 db.resume.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {skill: req.body.skill}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
  }
  if(req.body.type == "project")
  {
  	 db.resume.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {tittle: req.body.tittle, description: req.body.description}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
  }
});














app.listen(8080);
console.log("Server running on port 8080");