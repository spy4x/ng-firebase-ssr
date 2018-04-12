import {renderModuleFactory} from '@angular/platform-server';
import * as express from 'express';

import * as functions from 'firebase-functions';
import * as fs from 'fs';
import * as path from 'path';
import 'zone.js/dist/zone-node'; // Load zone.js for the server.

// Import the AOT compiled factory for your AppServerModule.
const AppServerModuleNgFactory = require(path.resolve(__dirname, '../dist-server/main.bundle')).AppServerModuleNgFactory;

// Load the index.html file.
const document = fs.readFileSync(path.resolve(__dirname, '../dist-server/index.html'), 'utf8');

let app = express();

app.get('**', (req, res) => {
  const url = req.path;
  renderModuleFactory(AppServerModuleNgFactory, {document, url})
    .then(html => {
      const cacheInSeconds = 72 * 60 * 60; // 72 hours
      res.set('Cache-Control', `public max-age=${cacheInSeconds} s-maxage=${cacheInSeconds}`);
      res.send(html);
    })
    .catch(err => {
      console.log(err);
    });
});

exports.ssr = functions.https.onRequest(app);
