require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const fetch = require('node-fetch');

const http = require('http');
const https = require('https');
const fs = require('fs');

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

const port = process.env.NODE_ENV === 'development' ? (process.env.PORT || 80) : 443;

if(process.env.NODE_ENV === "development") {
  http.createServer(app).listen(port, () => {
    console.log('Development server started on port ' + port)
  });
}
else {
  https.createServer({
    key: fs.readFileSync('key.pem'), 
    cert: fs.readFileSync('cert.pem'),
    passphrase: 'N0p4ssword!',
  }, app).listen(port, () => {
      console.log('Server started on port ' + port)
  });
}


app.get('/api/pokemon/search/:pokemonName', async (req, res) => {
  let pokemonName = req.params.pokemonName;
  let api = await getAPI(['pokemon/?limit=1118']);
  let results = [];
  if(api.results.length > 0)
  for(i = 0; i < api.results.length; i++) {
    if(new RegExp(pokemonName.toLowerCase()).test(api.results[i]['name']))
      results.push(api.results[i]);
  }
  res.json(results);
});

app.get('/api/pokemon/:pokemonName', async (req, res) => {
  let pokemonName = req.params.pokemonName;
  let api = await getAPI(['pokemon/' + pokemonName]);
  res.json(api);
});

function getAPI(req) {
  return fetch('https://pokeapi.co/api/v2/' + req[0], {
      method: 'GET', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
  }).catch(err => console.error(err)).then(res => {
    if(res.ok && res.statusCode != 404) return res.json();
    else throw new Error('Something went wrong not 404');  
  }).catch((err) => {
    return new Error('Something went wrong');
  });
}