import * as store from "./store.js";
import * as webRTChandler from "./webRTCHandler.js";
import * as constant from "./constant.js";
import * as wss from "./wss.js";
import * as ui from "./ui.js";
// import { getIncomingCallDialog } from "./elements.js";
//========================= CONNECT USING SOCKET.IO =============================//
// INITIALIZE SOCKET.IO AND ESTABLISH THE CONNECTION TO SOCKET.IO SERVER
const socket = io();
wss.registerSocketEvent(socket);
//===============================================================================//

//===============================================================================//
webRTChandler.getLocalPreview();
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
  const sendPersonalId = document.getElementById("personal_code_input").value;
  const chatCallType = constant.callType.CHAT_PERSONAL_CODE;
  webRTChandler.sendPreOffer(chatCallType, sendPersonalId);
});
// Attached a addeventListener for video button
personalCodeVideoButton.addEventListener("click", (e) => {
  // console.log(`Personal Video has been clicked`);
  const sendPersonalId = document.getElementById("personal_code_input").value;
  const videoCallType = constant.callType.VIDEO_PERSONAL_CODE;
  webRTChandler.sendPreOffer(videoCallType, sendPersonalId);
});
//===============================================================================//

//======================= Event listnerers for video call =======================//
//------------------------ enable and diable the mic ----------------------------//
// Cache the mic button
const micButton = document.getElementById("mic_button");
// Check if mic button is clicked
micButton.addEventListener("click", (e) => {
  // Cache the state of the local stream
  const localStream = store.getState().localStream;
  // Cache the local streams audio track
  // If mic is enabled return value is true
  const micEnabled = localStream.getAudioTracks()[0].enabled;
  // If mic is not enabled the return value is false
  localStream.getAudioTracks()[0].enabled = !micEnabled;
  ui.updateMicButton(micEnabled);
});
//------------------------ enable and diable the video ---------------------------//
// Cache the video button
const cameraButton = document.getElementById("camera_button");
// Check if video button is clicked
cameraButton.addEventListener("click", (e) => {
  // Cache the state of the local stream
  const localStream = store.getState().localStream;
  // Cache the local video streams
  // If video is enabled return value is true
  const videoEnabled = localStream.getVideoTracks()[0].enabled;
  // If mic is not enabled the return value is false
  localStream.getVideoTracks()[0].enabled = !videoEnabled;
  ui.updateCameraButton(videoEnabled);
});
//-------------------- enable and Screening Sharing Button -----------------------//
// Cache the video sharing button
const switchForScreeningSharingButton = document.getElementById(
  "screen_sharing_button"
);
// Check if video sharing button is clicked
switchForScreeningSharingButton.addEventListener("click", (e) => {
  // Cache the state of the video sharing which is defined in store.js
  const screenSharingActive = store.getState().screenSharingActive;
  // Pass the state of the video sharing to the
  // switchBetweenCameraAndScreeningSharing() function
  webRTChandler.switchBetweenCameraAndScreeningSharing(screenSharingActive);
});
//===============================================================================//

//===============================================================================//
// getIncomingCallDialog(
//   "Video",
//   () => {},
//   () => {}
// );
//===============================================================================//
