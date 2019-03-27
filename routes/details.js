var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
/* GET home page. */
router.get('/', function(req, res){

  var regno = req.query['regno'];
  request.post({
    url: 'https://regappsc.epragathi.org:1205/reg/citizenServices/applicationSearchForCitizen',
    json: {
          prNo: regno
    }
  }).pipe(res);
});

module.exports = router;
