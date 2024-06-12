const express = require("express");
const req = require("express/lib/request");
const bodyParser = require("body-parser");
const { createServer } = require("http");
const { Server } = require("socket.io");
const PORT = process.env.PORT || 3000;

const app = express();
const server = createServer(app);
const socketIo = new Server(server, {
  /* options */
});
// socketIo
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
//-------------------------------------------------------------------------------------------//
// Get route
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public_html/index.html");
});
//-------------------------------------------------------------------------------------------//
//===========================================================================================//

//===========================================================================================//
// connectedUsers stores an array of the connected socket.id's
let connectedUsers = [];
// Connect to socket.io
socketIo.on("connection", (socket) => {
  //===========================================================================================//
  // console.log(`User has connected to socket.IO with the ID: ${socket.id}`);
  // Add the active socket.id to the connectedUsers array
  connectedUsers.push(socket.id);
  //===========================================================================================//

  //================================= EMIT PRE-OFFER EVENT ====================================//
  // Emit the socket.io pre-offer event
  socket.on("pre-offer", (data) => {
    const { sendPersonalId, callType } = data;
    // console.log(
    //   `Pre-Offer from the app.js page with the data: ${sendPersonalId} - ${callType}`
    // );

    const connectedUser = connectedUsers.find(
      (userSocketId) => userSocketId === sendPersonalId
    );
    //----------------------------------------------------------------------------------------//
    if (connectedUser) {
      const data = {
        callerSocketId: socket.id,
        callType,
      };

      socketIo.to(sendPersonalId).emit("pre-offer", data);
    } else {
      const data = {
        preOfferAnswer: "CALLEE_NOT_FOUND",
      };
      socketIo.to(socket.id).emit("pre-offer-answer", data);
    }
    //----------------------------------------------------------------------------------------//
  });
  //===========================================================================================//

  //============================== EMIT PRE-OFFER-ANSWER EVENT ================================//
  // Emit the socket.io pre-offer event
  socket.on("pre-offer-answer", (data) => {
    const { callerSocketID, preOfferAnswer } = data;
    // console.log(data);
    // console.log(connectedUsers);

    const connectedUser = connectedUsers.find(
      (userSocketId) => userSocketId === callerSocketID
    );
    // console.log(connectedUser);
    if (connectedUser) {
      socketIo.to(callerSocketID).emit("pre-offer-answer", data);
    }
  });
  //===========================================================================================//

  //=============================== DISCONNECT FROM SOCKET.IO =================================//
  // Disconnect to socket.io when the browser closes //
  socket.on("disconnect", () => {
    console.log(
      `Successfully disconnected to wss/socket.io server with the id ${socket.id}`
    );
    // After disconnecting filter through the connectedUsers array
    // and only return the socket.id's still in the array
    const newConnectedUsers = connectedUsers.filter((userSocketId) => {
      return userSocketId !== socket.id;
    });
    // The remaining socket.id's remaining will be added to the connectedUsers
    connectedUsers = newConnectedUsers;
    console.log(connectedUsers);
  });
  //===========================================================================================//
});
//-------------------------------------------------------------------------------------------//
//===========================================================================================//

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
