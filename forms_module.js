
/**
 * MODULE `forms` 
 * descrip: general functions for interacting with Google Forms
 * 
 * EXPORTS: 
 * 1) .duplicate(
 *   template_form_id [string], destination_folder_id [string],
 *   optional: new_file_name, custom_title_text, custom_descrip_text
 * )  --> void
 *  duplicates your form with options for setting the form template, 
 *  destination folder, file name, title, and main description. 
 * 
 * 2) .clear(form_id) --> delete all child elements within a form. 
 * 
 * DOCUMENTATION: https://github.com/reppohopper/gas_hacks#readme 
 */

//        |         |         |         |         |         |         |         |(80)
const forms = (function forms_module_loader () {
  const exp = {};

  exp.duplicate = function (
    template_form_id, 
    destination_folder_id, 
    new_file_name,
    custom_title_text,  // Optionally overwrite the form title
    custom_descrip_text // Optionally overwrite the main form description
  ) {
    const destination_folder = DriveApp.getFolderById(destination_folder_id);
    if (new_file_name === undefined) {
      new_file_name = `Copy of form: ${template_form_id}`;
    }
    // Makes the copy and stores the Drive ID (string) of the new file. 

    // Always name the form somethnig, if only "copy of <copied form id>"
    const new_form_id = DriveApp.getFileById(template_form_id)
      .makeCopy(new_file_name, destination_folder).getId();
    console.log(
      `File id ${template_form_id} copied to a file named `
      +`"${new_file_name}", with id ${new_form_id}` 
    );

    // Always title the form something, if only "copy of <copied form id>"
    // or default to the file name if a title isn't specified. 
    const form = FormApp.openById(new_form_id);
    if (custom_title_text === undefined) {
      custom_title_text = new_file_name;
    }
    form.setTitle(custom_title_text);
    console.log(
      `Set title of new form to custom text: "${custom_title_text}".`
    );

    // Only add a description if a custom description was passed in. 
    if (custom_descrip_text !== undefined) {
      form.setDescription(custom_descrip_text);
      console.log(
        "Set description of new form to the following custom text: \n\n"
        + custom_descrip_text
      );
    }
    return new_form_id;
  }
//        |         |         |         |         |         |         |         |(80)

// Function to delete all child elements within a form. This includes 
// all sections and pages that users could once navigate through. It 
// leaves only the title and main description box in tact.  
  exp.clear_all_but_title_banner = exp.clear = function (
    form_id
  ) {
    const form = FormApp.openById(form_id);
    form.getItems().forEach(function (item) {
// Refer to each form item directly, and not by index, to avoid having to do
// something like iterating in reverse: https://stackoverflow.com/a/47684950 , 
// (although that was working consistently in testing. )
      form.deleteItem(item);
    });
  }

  return exp; // Export the exports. 
}()); // Close module. 
//        |         |         |         |         |    I    |   <3    | G.A.S.  |(80)
