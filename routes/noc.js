var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
/* GET home page. */
router.get('/', function(req, res){

  var regno = req.query['regno'];
  request.post({

    url: 'https://aptransport.in/APCFSTONLINE/Reports/NOCDtls.aspx',
    form: {
          __EVENTTARGET: '',
          __EVENTARGUMENT: '',
          __VIEWSTATE:'/wEPDwUJNzg3MzUxNjMwD2QWAmYPZBYCAgEPZBYGAgEPFgIeA3NyYwUXfi9pbWFnZXMvb25saW5lbG9nby5qcGdkAgMPDxYCHgRUZXh0BShBLlAuVHJhbnNwb3J0IERlcGFydG1lbnQgT25saW5lIFNlcnZpY2VzZGQCEw9kFgQCAQ8PFgYfAQUUTk8gTk9DIERFVEFJTFMgRk9VTkQeCENzc0NsYXNzBQhlcnJvcm1zZx4EXyFTQgICZGQCCQ8WAh4HVmlzaWJsZWcWHgIBDxYCHglpbm5lcmh0bWwFCUFQMDRBMjMwMGQCAw8WAh8FBQoxNy8xMi8xOTkyZAIFDxYCHwUFDksgViBLIFBSQVNBRCAgZAIHDxYCHwUFBk4gQkxVRWQCCQ8WAh8FBRBNQVJVVEkgVURZT0cgTFREZAILDxYCHwUFBlBFVFJPTGQCDQ8WAh8FBQpNQVJVVEkgODAwZAIPDxYCHwVlZAIRDxYCHwUFCU1PVE9SIENBUmQCEw8WAh8FBQpWSUpBWUFXQURBZAIVDxYCHwUFBjc3MzcwNWQCFw8WAh8FBQ5BTkRIUkEgUFJBREVTSGQCGQ8WAh8FBQY5MTU5MDBkAhsPFgIfBQUKMjEvMDkvMjAwNGQCHQ8WAh8FBQowMS8xMi8xOTkyZGSkY+aGv9oFliP0fmXGrj4i8Tv4Cg==',
          ctl00$OnlineContent$txtRegnNo:regno,
          ctl00$OnlineContent$BtnGetDetails:'Get Data'
      }

  }, function(error, response, html){

      if(!error) {
          console.log(html);
          var $ = cheerio.load(html);
          var json = {regno:$('#ctl00_OnlineContent_tdRegnNo').text(),
          ownername:$('#ctl00_OnlineContent_tdOwnerName').text(),
          makerclass:$('#ctl00_OnlineContent_tdMakersClass').text(),
          aadhaar:$('#ctl00_OnlineContent_tdAadharNo').text(),
    		  nocoffice:$('#ctl00_OnlineContent_tdIssuedToOffice').text(),
    		  nocstate:$('#ctl00_OnlineContent_tdIssuedToState').text(),
    		  nocdate:$('#ctl00_OnlineContent_tdNOCIssuedDt').text()
        }
      }
      res.writeHead(200, {"Content-Type": "application/json"});
      res.write(JSON.stringify(json));
      res.end();
  });

});

module.exports = router;
