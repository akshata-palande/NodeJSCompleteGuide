const http = require("http");
http
  .createServer(function (request, response) {
    //    TextResponse(response)
    HTMLResponse(response);
  })
  .listen(8081);

console.log("Server running at http://127.0.0.1:8081/");

const TextResponse = (response) => {
  response.writeHead(200, { "Content-Type": "text/plain" }); // Write plain Text
  response.end("Hello World"); // We should not write after this
  return response;
};

const HTMLResponse = (response) => {
  response.writeHead(200, { "Content-Type": "text/html" }); // Write HTML code
  response.write("<html>");
  response.write("<head><title>This is done with NodeJS </title></head>");
  response.write("<body>This is body tag done with NodeJS</body>");
  response.write("</html>");
  response.end(); // We should not write after this
  return response;
};
