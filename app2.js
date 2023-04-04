const fs = require("fs");
const http = require("http");
//take data from user and write it to messgae.txt
http
  .createServer(function (request, response) {
    const url = request.url;
    const method = request.method;
    if (url === "/") {
      response.write("<html>");
      response.write("<head><title>Enter Message</title></head>");
      response.write(
        "<body><form action ='message' method='POST'><input type='text' name='message'></input><nbsp><button> Submit </button></form></body>"
      );
      response.write("</html>");
      return response.end(); // We should not write after this
    }
    if (url === "/message" && method === "POST") {
      const body = [];
      request.on("data", (chunk) => {
        body.push(chunk);
      });
      request.on("end", () => {
        const parseBody = Buffer.concat(body).toString();
        fs.writeFileSync("message.txt", parseBody.split("=")[1]);
        response.statusCode = 302;
        response.setHeader("Location", "/");
        return response.end();
      });
    }
  })
  .listen(8081);

console.log("Server running at http://127.0.0.1:8081/");
