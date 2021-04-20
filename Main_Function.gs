var URL = 'https://XXX.api-us1.com/api/3';                               //update this value
var API = 'XXX';    //update this value
var URLgi = 'https://XXX.api-us1.com';                                   //update this value

var options =
    {
     'method' : 'GET',
     'headers': {
       'Api-Token': API
      }
    };

function mainFunction() {
   doGetAuto();
   doGetCampaigns();
   doGeneralInfo();
}
