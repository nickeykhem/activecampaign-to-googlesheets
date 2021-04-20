function doGetAuto(e) {
  return getAutoInformation(e);
}

function getAutoInformation(e){  
  
   try {
        var responseA = UrlFetchApp.fetch(URL+'/automations?orders[cdate]=DESC&limit=1000', options);
        var dataA = responseA.getContentText();

        var jsonA = JSON.parse(dataA);

        var automations = jsonA['automations'];

        var campaignData = [];
          
        for (var i = 0; i < automations.length; i++) {
            campaignData.push([
              automations[i]["name"],
              automations[i]["id"],
              automations[i]["cdate"],
              automations[i]["status"],
              automations[i]["links"]["campaigns"],      
                ]);
        }

            var numRows = campaignData.length;
            var numCols = campaignData[0].length;
            var ss = SpreadsheetApp.getActiveSpreadsheet();
            var sheet = ss.getSheetByName('Automations');
            sheet.getRange('A2:Y').clearContent();
            SpreadsheetApp.flush();
            Utilities.sleep(500);

            sheet.getRange(2,1,numRows,numCols).setValues(campaignData);
        }
        
        catch (error) {
            Logger.log(error);
        }
}
