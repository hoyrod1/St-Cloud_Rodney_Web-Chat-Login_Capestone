import * as store from "./store.js";
import * as ui from "./ui.js";
// This file will be registering the socket listening and functions to emmit events to the server
export const registerSocketEvent = (socket) => {
  socket.on("connect", () => {
    console.log(
      `Successfully connected to wss/socket.io server with the id ${socket.id}`
    );
    // Storing the socket.id in the setSoketId function in the store.js file
    store.setSocketId(socket.id);
    // passing the socket.id to be displayed in the UI
    ui.updatePersonalCode(socket.id);
  });
};

//======================== DISCONNECT FROM SOCKET.IO ========================//
// socket.on("disconnect", () => {
//   console.log(
//     `Successfully disconnected to wss/socket.io server with the id ${socket.id}`
//   );
// });
//============================================================================//
