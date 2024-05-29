const express = require("express");
const req = require("express/lib/request");
const bodyParser = require("body-parser");
const http = require("http");
const PORT = process.env.PORT || 4040;

const app = express();
const server = http.createServer(app);

//===========================================================================================//
app.use(express.json());
//-------------------------------------------------------------------------------------------//
/**
 * Middleware
 */
const logReq = (request, response, next) => {
  console.log(
    `${request.method} was made to ${request.url} from the hostname: ${request.hostname}!!!`
  );
  console.log("Request received!!!");
  next();
};
app.use(logReq);
//===========================================================================================//

//===========================================================================================//
app.use(express.urlencoded({ extended: true }));
// Parsing Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
app.use(express.static("public_html"));
//===========================================================================================//
//===========================================================================================//
// Get route
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public_html/index.html");
});
//-------------------------------------------------------------------------------------------//

//===========================================================================================//
// 404 Middleware
app.use((request, response, next) => {
  response.render("404", {
    title: "404 Opps page not found!!!",
  });
  next(error(404, `Resource not found`));
});
//-------------------------------------------------------------------------------------------//
// Error-handling middleware.
app.use((error, request, response, next) => {
  response.status(error.status || 500);
  response.json({ errMessage: error.message });
});
//===========================================================================================//
server.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
