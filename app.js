const express = require('express');
const http = require('http');
const https = require('https');
const fs = require('fs');
const app = express();
const host = 'ec2-18-117-168-141.us-east-2.compute.amazonaws.com';

http.createServer(app).listen(80);
https.createServer({
key: fs.readFileSync('key.pem'), 
cert: fs.readFileSync('cert.pem'),
passphrase: 'N0p4ssword!',
}, app).listen(443);


app.get('/', (req, res) => {
  res.send('Hello World!')
});


