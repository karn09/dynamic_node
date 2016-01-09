// Handle HTTP route GET / and POST / i.e. Home
var Profile = require('./profile.js');
var renderer = require('./renderer.js');
var querystring = require("querystring");

var commonHeaders = {
	'Content-Type': 'text/html'
};

function style(request, response) {
	response.writeHead(200, {
		'Content-Type': 'text/css'
	});
	renderer.style("main", response);
	response.end();
}

function home(request, response) {
	//  if url == '/' && GET
	if (request.url === '/') {
		if (request.method.toLowerCase() === "get") {

			// show search
			//response.writeHead(200, {'Content-Type': 'text/css'});
			//			renderer.style("main", response);

			response.writeHead(200, commonHeaders);
			renderer.view("header", {}, response);
			renderer.view("search", {}, response);
			renderer.view("footer", {}, response);
			response.end();
		} else {
			//  if url == '/' && POST
			// get post data from body
			request.on("data", function(postBody) {
				// extract the username
				var query = querystring.parse(postBody.toString());
				// redirect to /:username
				response.writeHead(303, {
					"Location": "/" + query.username
				});
				response.end();
			})
		}
	}
}
// Handle HTTP route GET /:username i.e. /chalkers
function user(request, response) {
	var username = request.url.replace("/", "");
	// if url == '/....'
	if (username.length > 0) {

		// response.writeHead(200, commonHeaders);
		// renderer.style("main", response);
		renderer.view("header", {}, response);
		//    get json from treehouse
		var studentProfile = new Profile(username);

		//      on 'end'
		studentProfile.on('end', function(profileJSON) {
			// show Profile

			// store the values which we need
			var values = {
				avatarURL: profileJSON.gravatar_url,
				username: profileJSON.profile_name,
				badges: profileJSON.badges.length,
				javascriptPoints: profileJSON.points.JavaScript
			};
			// simple response
			renderer.view("profile", values, response);
			//renderer.view("search", {}, response);
			renderer.view("footer", {}, response);
			response.end();
		});

		studentProfile.on("error", function(error) {
			renderer.view("header", {}, response);
			// show error
			renderer.view("error", {
				errorMessage: error.message
			}, response);
			renderer.view("search", {}, response);

			renderer.view("footer", {}, response);
			response.end();
		})
	}
}

module.exports.home = home;
module.exports.user = user;
module.exports.style = style;