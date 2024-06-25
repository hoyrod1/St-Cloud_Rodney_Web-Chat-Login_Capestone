require("dotenv").config();
//====================================================================//
const cors = require("cors");
const express = require("express");
const req = require("express/lib/request");
const bodyParser = require("body-parser");
const { createServer } = require("http");
const { Server } = require("socket.io");
const PORT = process.env.PORT || 3000;

const app = express();
const server = createServer(app);
const socketIo = new Server(server, {});
// socketIo
//===========================================================================================//
//-------------------------------------- REQUIRED ROUTES ------------------------------------//
const trainerRoutes = require("./routes/trainer.js");
const membersRoutes = require("./routes/members.js");
const assessmentRoutes = require("./routes/assessmentForm.js");
const trainingPackagesRoutes = require("./routes/trainingPackages.js");
//===========================================================================================//
// Use as a API feed
app.use(cors());
//===========================================================================================//
app.use(express.json());
//===========================================================================================//

//===========================================================================================//
// Middleware
const logReq = (request, response, next) => {
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
// Get route for landing index.html page
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public_html/index.html");
});
//====================================================================//
// Members routes
app.use("/members", membersRoutes);
// Assessment routes
app.use("/assessment-routes", assessmentRoutes);
// Training Packages routes
app.use("/training-packages", trainingPackagesRoutes);
// Trainer routes
app.use("/trainers", trainerRoutes);
//===========================================================================================//

//================== SOCKET.IO CONNECTION AND EVENT LISTENER CONFIGURATION ==================//
// connectedPeerStrangers stores an array of the connected peer strangers socket.id's
let connectedPeerStrangers = [];
// connectedUsers stores an array of the connected socket.id's
let connectedUsers = [];
// Connect to socket.io
socketIo.on("connection", (socket) => {
  //===========================================================================================//
  // Add the active socket.id to the connectedUsers array
  connectedUsers.push(socket.id);
  //===========================================================================================//

  //================================= EMIT PRE-OFFER EVENT ====================================//
  // Emit the socket.io pre-offer emit event
  socket.on("pre-offer", (data) => {
    const { sendPersonalId, callType } = data;

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
  // Emit the socket.io pre-offer emit event
  socket.on("pre-offer-answer", (data) => {
    const { callerSocketID, preOfferAnswer } = data;

    const connectedUser = connectedUsers.find(
      (userSocketId) => userSocketId === callerSocketID
    );

    if (connectedUser) {
      socketIo.to(callerSocketID).emit("pre-offer-answer", data);
    }
  });
  //===========================================================================================//

  //==================================== EMITS RTC EVENT ======================================//
  // Emit the socket.io webRTC-signaling emit event
  socket.on("webRTC-signaling", (data) => {
    const { connectedUserSocketId } = data;

    const connectedUser = connectedUsers.find(
      (userSocketId) => userSocketId === connectedUserSocketId
    );

    if (connectedUser) {
      socketIo.to(connectedUserSocketId).emit("webRTC-signaling", data);
    }
  });
  //===========================================================================================//

  //============================== LISTENING FOR HANG-UP EVENT ================================//
  // Listening for the hang up emit event
  socket.on("user-hanged-up", (data) => {
    const { connectedUserSocketId } = data;

    const connectedUser = connectedUsers.find(
      (userSocketId) => userSocketId === connectedUserSocketId
    );

    if (connectedUser) {
      socketIo.to(connectedUserSocketId).emit("user-hanged-up");
    }
  });
  //===========================================================================================//

  //======================== LISTENING FOR STRANGER CONNECTION EVENT ==========================//
  // Listening for a stranger connection emit event
  socket.on("stranger-connection-status", (data) => {
    const { status } = data;

    if (status) {
      // Add the active peers socket.id to the connectedPeerStrangers array
      connectedPeerStrangers.push(socket.id);
    } else {
      // filters out a peer strangers id that wants to join call
      const newConnectedPeerStrangers = connectedPeerStrangers.filter(
        (peerSocketId) => peerSocketId !== socket.id
      );
      // This adds the filtered out socket id to the connectedPeerStrangers[]
      connectedPeerStrangers = newConnectedPeerStrangers;
    }
  });
  //===========================================================================================//

  //===========================================================================================//
  // Listen for get-stranger-socket-id emit event
  // to get the peer strangers id's
  socket.on("get-stranger-socket-id", () => {
    let randomStrangerSocketId;
    const filterConnectedPeersStranger = connectedPeerStrangers.filter(
      (peerSocketId) => peerSocketId !== socket.id
    );

    if (filterConnectedPeersStranger.length > 0) {
      randomStrangerSocketId =
        filterConnectedPeersStranger[
          Math.floor(Math.random() * filterConnectedPeersStranger.length)
        ];
    } else {
      randomStrangerSocketId = null;
    }

    const data = {
      randomStrangerSocketId,
    };

    socketIo.to(socket.id).emit("stranger-socket-id", data);
  });
  //===========================================================================================//

  //=============================== DISCONNECT FROM SOCKET.IO =================================//
  // Disconnect to socket.io when the browser closes //
  socket.on("disconnect", () => {
    // After disconnecting filter through the connectedUsers array
    // and only return the socket.id's still in the array
    const newConnectedUsers = connectedUsers.filter((userSocketId) => {
      return userSocketId !== socket.id;
    });
    // The remaining socket.id's remaining will be added to the connectedUsers
    connectedUsers = newConnectedUsers;
    // Available connect users
    const newConnectedPeerStrangers = connectedPeerStrangers.filter(
      (peerSocketId) => peerSocketId !== socket.id
    );
    // This adds a socket id that is not active
    connectedPeerStrangers = newConnectedPeerStrangers;
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
