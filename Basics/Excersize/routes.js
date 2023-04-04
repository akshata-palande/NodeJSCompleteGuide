/**
 *
 *
 * @param {*} request accepts text from form
 * @param {*} response adds text to the file
 */
const routesHandler = (request, response) => {
  const url = request.url;
  const method = request.method;
  let savedUsers = [];
  if (url === "/") {
    fs.readFile("users.txt", "utf8", (err, data) => {
      if (data) {
        savedUsers = data.split(",");
        response.write("<html>");
        response.write("<head><title>Add User</title></head>");
        response.write(
          "<body><form action ='create-user' method='POST'><input type='text' name='users'></input><nbsp><button> Add </button></form></body>"
        );
        response.write("<ul>");
        for (item of savedUsers) response.write(`<li>${item}</li>`);
        response.write("</ul>");
        response.write("</html>");
        return response.end();
      } else if (err) {
        response.write("<html>");
        response.write("<head><title>Add User</title></head>");
        response.write(
          "<body><form action ='create-user' method='POST'><input type='text' name='users'></input><nbsp><button> Add </button></form></body>"
        );
        response.write("</html>");
        return response.end();
      }
    });
  }

  if (url === "/create-user" && method === "POST") {
    const body = [];
    request.on("data", (chunk) => {
      body.push(chunk);
    });
    request.on("end", () => {
      const parseBody = Buffer.concat(body).toString();

      let users = parseBody.split("=")[1].trim().concat(",");

      if (!users) return response.end();
      fs.readFile("users.txt", (err, data) => {
        if (data)
          fs.writeFile(
            "users.txt",
            `${data},${parseBody.split("=")[1].trim()}`,
            (err) => {
              response.statusCode = 302;
              response.setHeader("Location", "/");
              return response.end();
            }
          );
        else
          fs.writeFile("users.txt", parseBody.split("=")[1].trim(), (err) => {
            response.statusCode = 302;
            response.setHeader("Location", "/");
            return response.end();
          });
      });
    });
  }
};

module.exports = routesHandler;
