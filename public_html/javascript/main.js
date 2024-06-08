import * as store from "./store.js";
import * as webRTChandler from "./webRTCHandler.js";
import * as constant from "./constant.js";
import * as wss from "./wss.js";
//========================= CONNECT USING SOCKET.IO =============================//
// INITIALIZE SOCKET.IO AND ESTABLISH THE CONNECTION TO SOCKET.IO SERVER
const socket = io();
wss.registerSocketEvent(socket);
//===============================================================================//

//===============================================================================//
// CACHE THE THE BUTTON TO STORE the socket.io ID
const personalCodeCopyButton = document.getElementById(
  "personal_code_copy_button"
);
//------------------------------------------------------------------------------//
// Attached a addeventListener to personalCodeCopyButton to copy the socket.io ID
personalCodeCopyButton.addEventListener("click", (e) => {
  const personalId = store.getState().socketId;
  navigator.clipboard && navigator.clipboard.writeText(personalId);
});
//===============================================================================//

//===============================================================================//
// CACHE THE CHAT BUTTON TO STORE THE CHAT ID
const personalCodeChatButton = document.getElementById(
  "personal_code_chat_button"
);
// CACHE THE VIDEO BUTTON TO STORE THE VIDEO ID
const personalCodeVideoButton = document.getElementById(
  "personal_code_video_button"
);
//------------------------------------------------------------------------------//
// Attached a addeventListener for chat button
personalCodeChatButton.addEventListener("click", (e) => {
  // console.log(`Personal Chat has been clicked`);
  const sendPersonalCode = document.getElementById("personal_code_input").value;
  const chatCallType = constant.callType.CHAT_PERSONAL_CODE;
  webRTChandler.sendPreOffer(chatCallType, sendPersonalCode);
});
// Attached a addeventListener for video button
personalCodeVideoButton.addEventListener("click", (e) => {
  // console.log(`Personal Video has been clicked`);
  const sendPersonalCode = document.getElementById("personal_code_input").value;
  const videoCallType = constant.callType.VIDEO_PERSONAL_CODE;
  webRTChandler.sendPreOffer(videoCallType, sendPersonalCode);
});
//===============================================================================//
