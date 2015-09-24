var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');

/* GET home page. */
router.get('/', function(req, res){

  var regno = req.query['regno'];
  var viewstate = "";
  console.log(regno);
  request.get({
    url:'https://aptransport.in/APCFSTONLINE/Reports/OnlineLicenceSearch.aspx'}, function(error,response,html){
      var $ = cheerio.load(html);
      viewstate = $('#__VIEWSTATE').val();
      console.log(viewstate);
    });
  
  request.post({
    
    url:'https://aptransport.in/APCFSTONLINE/Reports/OnlineLicenceSearch.aspx',
    form: {
      
       __EVENTTARGET: '',
       __EVENTARGUMENT: '',__VIEWSTATE:viewstate,
       ctl00$OnlineContent$txtDlNo: regno,
       ctl00$OnlineContent$btnGetData:'Get Data'
       
     }
  }, function(error, response, html){
      var json = {"license":"","name":"","valid":"",
            "type":"","rta":""};
          if(!error){
            try{
            var $ = cheerio.load(html);
            var op = $('#ctl00_OnlineContent_gvLic tr').eq(1).html();
            $ = cheerio.load(op);
            console.log(html);
           json = {"license":"","name":"","valid":"",
            "type":"","rta":""};
          json.license = $('td').eq(0).text();
          json.name = $('td').eq(1).text();
          json.valid = $('td').eq(2).text();
          json.type = $('td').eq(4).text();
          json.rta = $('td').eq(5).text();
            }catch(e){ }
          res.writeHead(200, {"Content-Type": "application/json"});
      res.write(JSON.stringify(json));
      res.end();
        
          }
    });
  
  });


module.exports = router;
