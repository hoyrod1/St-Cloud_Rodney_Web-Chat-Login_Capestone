import * as store from "./store.js";
import * as webRTChandler from "./webRTCHandler.js";
import * as ui from "./ui.js";
//======================================================================================//

//======================================================================================//
// Delcaring and setting the socketIO to null before storing the socket.io connection
let socketIO = null;
//======================================================================================//

//======================================================================================//
// This function will be registering the socketIO to listen emmit events to the server
export const registerSocketEvent = (socket) => {
  //------------------------------------------------------------------------------------//
  socketIO = socket;
  //------------------------------------------------------------------------------------//
  socket.on("connect", () => {
    // Caching the socket.io connection
    // console.log(
    //   `Successfully connected to wss/socket.io server with the id ${socket.id}`
    // );
    // Injecting the socket.id in the setSoketId function in the store.js file
    store.setSocketId(socket.id);
    // Injecting the socket.id into the updatePersonalCode function be displayed in the UI
    ui.updatePersonalCode(socket.id);
  });
  //------------------------------------------------------------------------------------//

  //------------------------------------------------------------------------------------//
  socket.on("pre-offer", (data) => {
    webRTChandler.handlePreOffer(data);
  });
  //------------------------------------------------------------------------------------//
};
//======================================================================================//

//======================================================================================//
export const sendPreOffer = (data) => {
  console.log(
    `Emmitting pre-offer from sendPreOffer function with the data value: ${data}`
  );
  // Emmitting a event "pre-offer" and passing the video or chat call type data
  socketIO.emit("pre-offer", data);
};
//======================================================================================//
