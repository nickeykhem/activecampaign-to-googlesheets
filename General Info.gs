function doGeneralInfo(e) {
  return getSubscriberCount(e);
}

function getSubscriberCount(e){
  
  var bodyDataGI = [];

    bodyDataGI.push(
        ['api_key' , API],
        ['api_action' , 'list_list'],
        ['api_output' , 'json'],
        ['ids', 'all']
    );

  var bodyGI = bodyDataGI.map(function(el){el[1] = encodeURIComponent(el[1]); return el.join('=')}).join('&');
  
  var optionsGI =
   {
     'method' : 'GET',
     'payload' : bodyGI,
     'headers': {
       'Api-Token': API
     }
   };
  
  
    try {
        var responseGI = UrlFetchApp.fetch(URLgi+'/admin/api.php?', optionsGI);
        var dataGI = responseGI.getContentText();

        var jsonGI = JSON.parse(dataGI);
        var Subscriber = jsonGI;
      
        var ListKeys = Object.keys(jsonGI);
      
      var count = 0;
      for (var i = 0; i < ListKeys.length; i++) {       
        if (ListKeys[i].match(/^\d+$/)) {
        count++;
        } 
      }

        var SubscriberData = [];
   
        for (var i = 0; i < count; i++) {
          SubscriberData.push([
                Subscriber[i]["name"],
                Subscriber[i]["cdate"], 
                Subscriber[i]["id"],
                Subscriber[i]["subscriber_count"]
            ]);
        }

        var numRows2 = SubscriberData.length;
        var numCols2 = SubscriberData[0].length;
        var ssG = SpreadsheetApp.getActiveSpreadsheet();
        var sheetG = ssG.getSheetByName('General Info');
        sheetG.getRange('A2:E').clearContent();
            SpreadsheetApp.flush();
            Utilities.sleep(500);
       
        sheetG.getRange(2,1,numRows2,numCols2).setValues(SubscriberData);

    }
    catch (error) {
        Logger.log(error);
    }
}
