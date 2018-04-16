const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'))

var mysql = require('mysql')

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'yourpassword',
  database: 'fortnite'
})



connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected...')


      connection.query('SELECT * FROM user WHERE name LIKE \'test\'', function(err, results) {
        if (err) throw err
        console.log(results[0].name)
        console.log(results[0].password)
        console.log(results[0].kills)
        console.log(results[0].games)
      })

})

app.post('/api/', (req, res) => {
let clientName = req.body.text;
  console.log('given from client');
  console.log(clientName);

  var name = 'jim';
  connection.query('SELECT * FROM user WHERE name LIKE ?', clientName, function(err, results) {

console.log(results);
    if (results.length < 1 && results)
    {
      console.log('results are null')

      connection.query('INSERT INTO user(name, password, kills, games) VALUES(?,?,?,?)', [clientName, '1', 0, 0] ,function(err, results) {
        connection.query('SELECT * FROM user WHERE name LIKE ?', clientName, function(err, results) {
          res.send(results[0]);
        })
      })
    }
    else{
        // old works
          console.log('results NOT are null')
    if (err) throw err
    name = results[0].name

      name = results[0].name;
      res.send(results[0]);
    }
  })



});

app.post('/api/kills/', (req, res) => {
  let clientName = req.body.text;
    console.log('addKill');

var killcount;
    connection.query('SELECT * FROM user WHERE name LIKE ?', clientName, function(err, results) {
      if (err) throw err
      name = results[0].name

      killcount = results[0].kills;

        killcount = parseInt(results[0].kills) + 1;
      console.log("kills:");
      console.log(killcount);

      connection.query('UPDATE user SET kills = ? WHERE name = ?', [killcount, clientName], function(err, results) {

        console.log("In update");
      //  console.log(killcount);

        connection.query('SELECT * FROM user WHERE name LIKE ?', clientName, function(err, results) {
          console.log("In second get");

          if (err) throw err
          name = results[0].name

            name = results[0].name;
            res.send(results[0]);
        })
      })

    })
});

app.post('/api/wins/', (req, res) => {
  let clientName = req.body.text;
    console.log('addwin');

var killcount;
    connection.query('SELECT * FROM user WHERE name LIKE ?', clientName, function(err, results) {
      if (err) throw err
      name = results[0].name

      winCount = parseInt(results[0].games) + 1;


      console.log("games:");
      console.log(winCount);

      connection.query('UPDATE user SET games = ? WHERE name = ?', [winCount, clientName], function(err, results) {

        console.log("In update");
      //  console.log(killcount);

        connection.query('SELECT * FROM user WHERE name LIKE ?', clientName, function(err, results) {
          console.log("In second get");

          if (err) throw err
          name = results[0].name

            name = results[0].name;
            res.send(results[0]);
        })
      })

    })
});

app.put('/api/', (req, res) => {
  res.send('I am updated.\n');
});



app.listen(3000, () => console.log('Server listening on port 3000!'));
