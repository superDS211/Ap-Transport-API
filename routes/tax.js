var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');

router.get('/', function(req, res){

  var regno = req.query['regno'];
  request.post({
      url: 'https://aptransport.in/APCFSTONLINE/Reports/RegistrationValiditySearch.aspx',
      form: {
          __EVENTTARGET: '',
          __EVENTARGUMENT: '',
          __VIEWSTATE:'/wEPDwUKMTYxNTYyOTQxMA9kFgJmD2QWAgIBD2QWBgIBDxYCHgNzcmMFF34vaW1hZ2VzL29ubGluZWxvZ28uanBnZAIDDw8WAh4EVGV4dAUoQS5QLlRyYW5zcG9ydCBEZXBhcnRtZW50IE9ubGluZSBTZXJ2aWNlc2RkAhMPZBYEAgEPDxYCHwFlZGQCCQ8WAh4HVmlzaWJsZWcWJgIBDxYCHglpbm5lcmh0bWwFCUFQMjFROTE1N2QCAw8WAh8DBQtNT1RPUiBDWUNMRWQCBQ8WAh8DBQoxMy8xMS8yMDIzZAIHDxYCHwNlZAIJDxYCHwNlZAILDxYCHwNlZAINDxYCHwNlZAIPDxYCHwNlZAIRDxYCHwNlZAITDxYCHwNlZAIZDxYCHwMFBzMzNTAuMDBkAhsPFgIfAwUKMjAvMTAvMjAwOGQCHQ8WAh8DBQoxOS8xMC8yMDIwZAIfDxYCHwNlZAIhDxYCHwNlZAIjDxYCHwNlZAIlDxYCHwMFDDU1MDcwNzAyODU0NmQCJw8WAh8DBSJOQVRJT05BTCBJTlNVUkFOQ0UgQ09NUEFOWSBMSU1JVEVEZAIpDxYCHwMFCjEwLzEwLzIwMDlkZEjXiRV4ZoHcphgvO7E6mlTkwB9G',
          ctl00$OnlineContent$txtRegnNo:regno,
          ctl00$OnlineContent$BtnGetDetails:'Get Deails'
      }
  }, function(error, response, html){
    
    if(!error) {
      var $ = cheerio.load(html);
      var json = {taxamount: "", datepaid: "", datevalid:""};
      json.datepaid = $('#ctl00_OnlineContent_tdTaxVfdt').text();
      json.taxamount = $('#ctl00_OnlineContent_tdTaxAmount').text();
      json.datevalid = $('#ctl00_OnlineContent_tdTaxVtdt').text();
      res.writeHead(200, {"Content-Type": "application/json"});
      res.write(JSON.stringify(json));
      res.end();
    }
  });

});
module.exports = router;