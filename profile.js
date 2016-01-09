var EventEmitter = require("events").EventEmitter
var https = require("https");
var util = require("util");
var http = require("http");

function Profile(username) {
	EventEmitter.call(this);
	profileEmitter = this;

	var request = https.get("https://teamtreehouse.com/" + username + ".json", function(response) {
		var body = "";
		if (response.statusCode !== 200) {
			request.abort();
			profileEmitter.emit("error", new Error("There was an error getting the profile for " + username + ". (" + http.STATUS_CODES[response.statusCode] + ")"));
		}

		// read the data
		response.on("data", function(chunk) {
			body += chunk;
			profileEmitter.emit("data", chunk);
		});

		response.on("end", function() {
			if (response.statusCode === 200) {
				try {
					// Parse the data
					var profile = JSON.parse(body);
					profileEmitter.emit("end", profile);
				} catch (error) {
					profileEmitter.emit("error", error);
				}
			}
		}).on("error", function(error) {
			profileEmitter.emit("error", error);
		})
	})
}

util.inherits(Profile, EventEmitter);
module.exports = Profile;