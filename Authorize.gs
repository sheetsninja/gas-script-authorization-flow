/**
 * @OnlyCurrentDoc
 * Remove if you will be accessing other spreadsheets
 */

//**************************************************************************************************************************** */
function onOpen() {
  let authorize = PropertiesService.getScriptProperties().getProperty('isAuthorized');

  if (authorize == null) {
    let ui = SpreadsheetApp.getUi();
    ui.createMenu("Authorize Script").addItem("Run First (once)", "firstTime").addSeparator().addItem('Run Next', "secondTime").addToUi();
  }
}

//**************************************************************************************************************************** */
function firstTime() {
  // running this function will automatically ask for permissions to all services mentioned or used in the script.
}

//**************************************************************************************************************************** */
function addTrigger() {
    let triggerId = ScriptApp.newTrigger('checkMySheet').forSpreadsheet(SpreadsheetApp.getActiveSpreadsheet()).onEdit().create().getUniqueId();
    PropertiesService.getScriptProperties().setProperty('triggerID', triggerId);
}

//**************************************************************************************************************************** */
function secondTime() {
  addTrigger();  // add trigger. Comment out this line if you don't need a trigger
  PropertiesService.getScriptProperties().setProperty('isAuthorized', 'true');
  SpreadsheetApp.getActiveSpreadsheet().removeMenu("Authorize Script");
    let authorize;
  try {authorize = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('How to Authorize Script');
  SpreadsheetApp.getActiveSpreadsheet().deleteSheet(authorize);}
  catch(e){};
}
