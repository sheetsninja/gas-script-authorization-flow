/**
 * @OnlyCurrentDoc
 * Remove this line if you will be accessing other spreadsheets
 */

//**************************************************************************************************************************** */
// onOpen runs everytime the Google Sheet is opened and this checks to see if the script has been authorized
function onOpen() {
  let authorize = PropertiesService.getScriptProperties().getProperty('isAuthorized');

  if (authorize == null) {
    let ui = SpreadsheetApp.getUi();
    ui.createMenu("Authorize Script").addItem("Run First (once)", "firstTime").addSeparator().addItem('Run Next', "secondTime").addToUi();
  }

  if (authorize == 'true') {
    regularMenu(); // show regular script menu if needed
  }
}

//**************************************************************************************************************************** */
// Sample regular script menu for running scripts from a custom menu
function regularMenu() {
  let ui = SpreadsheetApp.getUi();
  ui.createMenu("Script Menu")
    .addItem("Menu Item", "functionName")
    .addSeparator()
    .addItem('Menu Item 2', "functionName2")
    .addToUi();
}


//**************************************************************************************************************************** */
// running this function will automatically ask for permissions to all services mentioned or used in the script.
function firstTime() {
}

//**************************************************************************************************************************** */
// Add trigger(s) if necessary. 
function addTriggers() {
  ScriptApp.newTrigger('checkMySheet').forSpreadsheet(SpreadsheetApp.getActiveSpreadsheet()).onEdit().create(); // sample on edit trigger
  ScriptApp.newTrigger('dailyTrigger').timeBased().everyDays(1).atHour(5).create(); // sample daily trigger
}

//**************************************************************************************************************************** */
// This processes adding any script triggers as needed, marks the script as authorizes, and refreshes the menu
function secondTime() {
  addTriggers();  // add trigger. Comment out this line if you don't need a trigger
  PropertiesService.getScriptProperties().setProperty('isAuthorized', 'true');
  onOpen(); // refresh script menu to add the regular menu (the authorize menu will disappear when you reload or reopen the Google Sheet)
}
