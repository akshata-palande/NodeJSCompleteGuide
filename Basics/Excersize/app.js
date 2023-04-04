const http = require("http");
const routes = require("../Excersize/routes");
http.createServer(routes).listen(8081);

console.log("Server running at http://127.0.0.1:8081/");
