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



if(process.env.MODE_ENV === "development") http.createServer(app).listen(80);
else https.createServer({
  key: fs.readFileSync('key.pem'), 
  cert: fs.readFileSync('cert.pem'),
  passphrase: 'N0p4ssword!',
}, app).listen(443);


app.get('/api/*', async (req, res) => {
  let api = await getAPI(req.params);
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
    else throw new Error('Something went wrong');  
  }).catch((err) => {
    return new Error('Something went wrong');
  });
}


