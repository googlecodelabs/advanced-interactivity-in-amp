/*
Copyright 2017 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

var express = require('express');
var formidable = require('formidable');

var app = express();

var skuToSizeAndPrice = {
  "1001": {
    "sizes": {
      "XS": 8.99,
      "S": 9.99,
    },
  },
  "1002": {
    "sizes": {
      "S": 10.99,
      "M": 12.99,
      "L": 14.99,
    },
  },
  "1010": {
    "sizes": {
      "L": 11.99,
      "XL": 13.99,
    },
  },
  "1014": {
    "sizes": {
      "M": 7.99,
      "L": 9.99,
      "XL": 11.99,
    },
  },
  "1015": {
    "sizes": {
      "XS": 8.99,
      "S": 10.99,
      "L": 15.99,
    },
  },
  "1016": {
    "sizes": {
      "S": 8.99,
      "L": 14.99,
      "XL": 11.99,
    },
  },
  "1021": {
    "sizes": {
      "XS": 8.99,
      "S": 9.99,
      "M": 12.99,
    },
  },
  "1030": {
    "sizes": {
      "M": 10.99,
      "L": 11.99,
    },
  },
};

app.get('/shirts/sizesAndPrices', function(req, res) {
  var sku = req.query.sku;
  var response = {};
  response[sku] = skuToSizeAndPrice[sku];
  setTimeout(() => res.json(response), 1000); // Simulate network delay.
});

app.post('/shirts/addToCart', function(req, res) {
  // Necessary for AMP CORS security protocol.
  // @see https://github.com/ampproject/amphtml/blob/master/spec/amp-cors-requests.md
  res.setHeader('AMP-Access-Control-Allow-Source-Origin',
      'http://localhost:3000');

  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields) {
    if (fields.color && fields.size && fields.quantity) {
      res.status(200).json(fields);
    } else {
      res.status(400).json({error: 'Please select a size.'});
    }
  });
});

app.use('/', express.static('static'));

app.listen(3000, function () {
  console.log('Server for "Advanced Interactivity in AMP" codelab listening on port 3000!');
});
