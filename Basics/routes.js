const fs = require("fs");
const requestHandler = (request, response) => {
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
      // sychronus call blocks further execution
      // its not suggested to use for large files

      // fs.writeFileSync("message.txt", parseBody.split("=")[1]);

      // following is other option to write file asynchronus
      fs.writeFile("message.txt", message, (err) => {
        response.statusCode = 302;
        response.setHeader("Location", "/");
        return response.end();
      });
    });
  }
};

module.exports = requestHandler;
