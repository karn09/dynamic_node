var fs = require("fs");
// Function that handles the reading of files and merge in value
//   read from file and get a string
//     merge values in to string
function mergeValues(values, content) {
	// cycle over keys of values
	for (var key in values) {
		// replace all {{keys}} with values from values object
		content = content.replace("{{" + key + "}}", values[key])
	}
	// return merged content
	return content;
}

function view(templateName, values, response) {
	// read from template file
	var fileContents = fs.readFileSync("./views/" + templateName + ".html", {
		encoding: "utf8"
	});
	// insert values into content
	fileContents = mergeValues(values, fileContents);
	// write out to the response
	response.write(fileContents);
}


function css(sheet, response) {
	var cssContent = fs.readFileSync("./views/" + sheet + ".css", {
		encoding: "utf8"
	})
	response.write(cssContent);
}

module.exports.view = view;
module.exports.css = css;
