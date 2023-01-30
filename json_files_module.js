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

// Replacer and space parameters can optionally be specified in the 2nd and 3rd 
// positions and they will be passed down directly to JSON.stringify. But it 
// will default to pretty printing with indent "2".
  exp.overwrite_with_js_object = exp.overwrite = function (
    js_object, replacer=undefined, space=2
  ) {
    our_json_file.setContent(JSON.stringify(object, replacer, space));
  }
}());