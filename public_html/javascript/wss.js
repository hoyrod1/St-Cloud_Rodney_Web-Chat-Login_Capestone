import * as store from "./store.js";
import * as ui from "./ui.js";
//======================================================================================//

//======================================================================================//
// Delcaring and setting the socketIO to null before storing the socket.io connection
let socketIO = null;
//======================================================================================//

//======================================================================================//
// This function will be registering the socketIO to listen emmit events to the server
export const registerSocketEvent = (socket) => {
  socket.on("connect", () => {
    // Caching the socket.io connection
    socketIO = socket;
    console.log(
      `Successfully connected to wss/socket.io server with the id ${socket.id}`
    );
    // Injecting the socket.id in the setSoketId function in the store.js file
    store.setSocketId(socket.id);
    // Injecting the socket.id into the updatePersonalCode function be displayed in the UI
    ui.updatePersonalCode(socket.id);
  });
};
//======================================================================================//

//======================================================================================//
export const sendPreOffer = (data) => {
  // Emmitting a event "pre-offer" and passing the video or chat call type data
  socketIO.emit("pre-offer", data);
};
//======================================================================================//
