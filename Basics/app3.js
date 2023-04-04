const http = require("http");
const routes = require("./routes");
//take data from user and write it to messgae.txt
http.createServer(routes).listen(8081);

console.log("Server running at http://127.0.0.1:8081/");
