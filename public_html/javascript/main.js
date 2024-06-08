import * as store from "./store.js";

import * as wss from "./wss.js";
//========================= CONNECT USING SOCKET.IO ==========================//
// INITIALIZE SOCKET.IO AND ESTABLISH THE CONNECTION TO SOCKET.IO SERVER
const socket = io();
wss.registerSocketEvent(socket);
//============================================================================//
// CACHE THE BUTTON WITH THE id=personal_code_copy_button
const personalCodeCopyButton = document.getElementById(
  "personal_code_copy_button"
);
// Attach a addeventListener to personalCodeCopyButton to copy the socket.io ID
personalCodeCopyButton.addEventListener("click", (e) => {
  const personalId = store.getState().socketId;
  navigator.clipboard && navigator.clipboard.writeText(personalId);
});
