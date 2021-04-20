function doGetCampaigns(e) {
 return   getCampaignsInformation(e);
}

function getCampaignsInformation(e){

        try {
            var responseC = UrlFetchApp.fetch(URL+'/campaigns?orders[id]=DESC&limit=100', options);
            var dataC = responseC.getContentText();

            var jsonC = JSON.parse(dataC);

            var campaigns = jsonC['campaigns'];

            var campaignData = [];
          
           for (var i = 0; i < campaigns.length; i++) {
            campaignData.push([
              campaigns[i]["name"],
              campaigns[i]["id"],
              campaigns[i]["automation"],
              campaigns[i]["ldate"],
              campaigns[i]["send_amt"],
              campaigns[i]["uniqueopens"],
              campaigns[i]["subscriberclicks"],
              campaigns[i]["uniquelinkclicks"],
              campaigns[i]["unsubscribes"],
              campaigns[i]["forwards"],
              campaigns[i]["replies"],
              campaigns[i]["hardbounces"],
              campaigns[i]["softbounces"],             
                ]);
              }

            var numRows = campaignData.length;
            var numCols = campaignData[0].length;
            var ss = SpreadsheetApp.getActiveSpreadsheet();
            var sheet = ss.getSheetByName('Campaigns');
            sheet.getRange('A2:M').clearContent();
            SpreadsheetApp.flush();
            Utilities.sleep(500);

            sheet.getRange(2,1,numRows,numCols).setValues(campaignData);

        }
        catch (error) {
            Logger.log(error);
        }
    }
