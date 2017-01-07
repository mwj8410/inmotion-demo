const express = require('express');
const http = require('http');
const path = require('path');
const routs = require('./api/routs');

var config = require('./config/production').api,
  router = express(),
  server = http.createServer(router),
  staticContentPath = `${__dirname}${path.sep}hosted`; // Allows for MS and *nix hosting environemnts

// Override production configuration with local configuration if available
try {
  var localConfig = require('./config/local').api;
  config = Object.assign(config, localConfig);
  process.stdout.write('Production configuration using local values.\n');
} catch (ex) {}
// Now,
global.config = config;

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header('Access-Control-Allow-Headers', [
      'Authorization',
      'Content-Type',
      'Content-Length',
      'X-Requested-With'
    ].join(',')
  );
  next();
});

router.use('/app', express.static(staticContentPath));

// Mount hosted API routs
routs.forEach(rout => {
  router[rout[0].toLowerCase()](`/api/${rout[1]}`, rout[2]);
});

server.listen(config.port, '0.0.0.0', () => {
	process.stdout.write(`Server running at localhost:${config.port}.\n`);
	server.address();
});
