var router = require("./router.js")
	// Problem: We need a simple way to look at users badge count and JavaScript points from a web browser
	// Solution: Use nodeJs to perform profile lookup and serv template via HTTP

// Create a web server
const http = require('http');

const hostname = '127.0.0.1';
const port = 1337;

http.createServer((request, response) => {
	router.style(request, response);
	router.home(request, response);
	router.user(request, response);
}).listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});

// improvements to be made.
// Serve static files
// CSS (.css)
// Images (.png, .jpg, .gif, .svg)
// Client-side JavaScript (.js)