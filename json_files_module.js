/**
 * MODULE `json_files` 
 * descrip: read and (over)write .json files in your Google Drive
 * 
 * EXPORTS: 
 * 1) .read(file_id) --> a JS Object
 * 2) .overwrite(file_id, JS_obj) --> void; overwrites your `.json` file
 * 
 * DOCUMENTATION: https://github.com/reppohopper/gas_hacks#readme
 */
// general apps script module code accessible at ...
// https://github.com/reppohopper/gas_hacks/blob/main/json_files_module.js

//        |         |         |         |         |         |         |         |(80)
// Module by closure pattern: 
// https://github.com/reppohopper/js_patterns/blob/main/modules_by_closure.md
const json_files = (function json_files_module_loader () {
  const exp = {};

  exp.read_into_js_object = exp.read = function (file_id_in_drive) {
    return JSON.parse(
      DriveApp.getFileById(file_id_in_drive).getBlob().getDataAsString()
    );
  }
// Replacer and space parameters can optionally be specified in the 3rd and 4rd 
// positions and they will be passed down directly to JSON.stringify 2nd and 
// 3rd positions. But it will default to pretty printing with indent "2".
  exp.overwrite_with_js_object = exp.overwrite = function (
    file_id_in_drive, js_object, replacer=undefined, space=2
  ) {
    DriveApp.getFileById(file_id_in_drive).setContent(
      JSON.stringify(js_object, replacer, space)
    );
  }
}());
