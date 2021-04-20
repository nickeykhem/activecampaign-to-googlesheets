function doGetCampaigns(e) {
 return   getCampaignsInformation(e);
}

function getCampaignsInformation(e){

        try {
            var responseC = UrlFetchApp.fetch(URL+'/campaigns?orders[id]=DESC&limit=100', options);
            var dataC = responseC.getContentText();

            var jsonC = JSON.parse(dataC);

            var campaigns = jsonC['campaigns'];

            //Get total number of campaigns
            var meta = jsonC['meta'];
            var totalCount = meta["total"];
             
            var loopCount = 0;
            var offsetCount = 0;

            //Setup the loop based on 100 responses limit per request
            while (totalCount>0) {              
              totalCount -= 100;
              loopCount++;
            }
           

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
            sheet.getRange('A2:N').clearContent();
            SpreadsheetApp.flush();
            Utilities.sleep(500);

            sheet.getRange(2,1,numRows,numCols).setValues(campaignData);


            //if there is more than 100 values, use loopCount to send an offset API call
            while (loopCount > 0) {

              offsetCount+=100; //offset goes up by 100 for every loop as each api return is set to 100

              responseC = UrlFetchApp.fetch(URL+'/campaigns?orders[id]=DESC&limit=100&offset='+offsetCount, options);
              dataC = responseC.getContentText();
              jsonC = JSON.parse(dataC);
              campaigns = jsonC['campaigns'];

              campaignData = [];
          
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
                var lastRow = sheet.getLastRow()+1;
                sheet.getRange('A'+lastRow+':N').clearContent();
                SpreadsheetApp.flush();
                Utilities.sleep(500);
                //method getRange(row, column, optNumRows, optNumColumns)
                sheet.getRange(lastRow,1,numRows,numCols).setValues(campaignData);

              //decrease the loop count
              loopCount--;
            }

        }
        catch (error) {
            Logger.log(error);
        }
    }
