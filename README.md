# Active Campaign to Google Sheets
Using Apps Script and Active Campaign API, pull data into Google sheets

Steps
1: Create a Google Sheet with the following tabs
  - Campaigns
  - Automations
  - Main_Function

2: Click on Tools > Apps Script

3: Rename and add the following .gs files
  - Campaigns.gs
  - Automations.gs
  - Main_Function.gs

4: Copy the code from the .gs files into the relevant directory

5: Head over to Active Campaign, Login and make sure you have access to the Admin account
  - Go to Settings > Developer
  - Copy the URL and KEY values and replace the values in Main_Function.gs
  * Make sure you copy the URL into the URLgi variable, but the URL variable requires the /api/3 after it.

var URL = 'https://XXX.api-us1.com/api/3';                               //update this value
var API = 'XXXX';    //update this value
var URLgi = 'https://XXX.api-us1.com';                                   //update this value
