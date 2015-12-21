var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
/* GET home page. */
router.get('/', function(req, res){

  var regno = req.query['regno'];
  request.post({

    url: 'https://aptransport.in/APCFSTONLINE/Reports/VehicleRegistrationSearch.aspx',
    form: {
          ctl00$OnlineContent$ScriptManager1: 'ctl00$OnlineContent$Updatepanel1|ctl00$OnlineContent$btnGetData',
          __EVENTTARGET: '',
          __EVENTARGUMENT: '',
          __VIEWSTATE:'/wEPDwUKMTQ2ODcyMzU1Mw9kFgJmD2QWAgIBD2QWBgIBDxYCHgNzcmMFF34vaW1hZ2VzL29ubGluZWxvZ28uanBnZAIDDw8WAh4EVGV4dAUoQS5QLlRyYW5zcG9ydCBEZXBhcnRtZW50IE9ubGluZSBTZXJ2aWNlc2RkAhUPZBYCAgUPZBYCZg9kFgQCAQ8PFgIfAWVkZAINDxYCHgdWaXNpYmxlZxYiAgEPFgIeCWlubmVyaHRtbAUJQVAyMUc1MDM1ZAIDDxYCHwMFBlBFVFJPTGQCBQ8WAh8DBQ1WRU5LQVRBUkFNICBLZAIHDxYCHwMFBUJMQUNLZAIJDxYCHwMFC01PVE9SIENZQ0xFZAILDxYCHwMFDkJBSkFKIEFVVE8gTFREZAINDxYCHwMFCjAxLzA2LzIwMDJkAg8PFgIfAwUOQkFKQUogQk9YRVIgQVRkAhEPFgIfAwULREZNQkpDNjA1NDZkAhMPFgIfAwUKMTYvMDcvMjAwMmQCFQ8WAh8DBQtERkZCSkMyNDU5NGQCFw8WAh8DZWQCGQ8WAh8DZWQCGw8WAh8DBQtSVEEgS1VSTk9PTGQCHQ8WAh8DZWQCHw8WAh8DBQZBQ1RJVkVkAiMPPCsADQBkGAEFG2N0bDAwJE9ubGluZUNvbnRlbnQkZ3ZkbHN1cw9nZN3WoyR/48Q83TPYKvbOPwTeXtQK',
          ctl00$OnlineContent$ddlInput:'R',
          ctl00$OnlineContent$txtInput:regno,
          ctl00$OnlineContent$btnGetData:'Get Data'
      }

  }, function(error, response, html){

      if(!error) {
          console.log(html);
          var $ = cheerio.load(html);
          var json = {regno:$('#ctl00_OnlineContent_tdRegnNo').text(),
          fueltype:$('#ctl00_OnlineContent_tdFuelType').text(),
          ownername:$('#ctl00_OnlineContent_tdOwner').text(),
          vehicleclass:$('#ctl00_OnlineContent_tdVehClass').text(),
          mfgdate:$('#ctl00_OnlineContent_tdMfgYear').text(),
          makerclass:$('#ctl00_OnlineContent_tdMkrClass').text(),
          aadhaar:$('#ctl00_OnlineContent_tdAadharNo').text()
        }
      }
      res.writeHead(200, {"Content-Type": "application/json"});
      res.write(JSON.stringify(json));
      res.end();
  });

});

module.exports = router;
