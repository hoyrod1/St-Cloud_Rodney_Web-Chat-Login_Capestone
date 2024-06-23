import * as store from "./store.js";
import * as webRTChandler from "./webRTCHandler.js";
import * as constant from "./constant.js";
import * as wss from "./wss.js";
import * as recordingUtils from "./recordingUtils.js";
import * as strangerUtils from "./strangerUtils.js";
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
// CACHE THE VIDEO BUTTON TO STORE THE VIDEO ID
const personalCodeVideoButton = document.getElementById(
  "personal_code_video_button"
);
// CACHE THE CHAT BUTTON TO STORE THE CHAT ID
const personalCodeChatButton = document.getElementById(
  "personal_code_chat_button"
);
//------------------------------------------------------------------------------//
// Attached a addeventListener for chat button
personalCodeChatButton.addEventListener("click", (e) => {
  
  const sendPersonalId = document.getElementById("personal_code_input").value;
  const chatCallType = constant.callType.CHAT_PERSONAL_CODE;
  webRTChandler.sendPreOffer(chatCallType, sendPersonalId);
});
// Attached a addeventListener for video button
personalCodeVideoButton.addEventListener("click", (e) => {
  
  const sendPersonalId = document.getElementById("personal_code_input").value;
  const videoCallType = constant.callType.VIDEO_PERSONAL_CODE;
  webRTChandler.sendPreOffer(videoCallType, sendPersonalId);
});
//===============================================================================//

//===============================================================================//
// CACHE THE STRANGERS VIDEO BUTTON TO STORE THE VIDEO ID
const strangerVideoButton = document.getElementById("stranger_video_button");
// CACHE THE STRANGERS CHAT BUTTON TO STORE THE CHAT ID
const strangerChatButton = document.getElementById("stranger_chat_button");
// CACHE THE ID FOR THE STRANGER CHECKBOX EVENT
const checkBox = document.getElementById("allow_strangers_checkbox");
//-------------------------------------------------------------------------------//
// Event Listener for the stranger check box
checkBox.addEventListener("click", (e) => {
  const checkboxState = store.getState().allowConnectionFromStrangers;
  ui.updateStrangerCheckbox(!checkboxState);
  store.setAllowConnectionsFromStrangers(!checkboxState);
  strangerUtils.changeStrangerConnectionStatus(!checkboxState);
});
// Event Listener for the stranger video button
strangerVideoButton.addEventListener("click", (e) => {
  strangerUtils.getStrangerSocketIdAndConnect(
    constant.callType.VIDEO_STRANGERL_CODE
  );
});
// Event Listener for the stranger chat button
strangerChatButton.addEventListener("click", (e) => {
  strangerUtils.getStrangerSocketIdAndConnect(constant.callType.CHAT_STRANGER);
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

//====================== Event listnerers for chat message ======================//
// Caching the chat input
const newMessageInput = document.getElementById("new_message_input");
newMessageInput.addEventListener("keydown", (e) => {
  
  const key = e.key;
  
  if (key === "Enter") {
    webRTChandler.sendMessageUsingDataChannel(e.target.value);
    ui.appendMessage(e.target.value, true);
    newMessageInput.value = "";
  }
});
//------------------------- Send message from the input -------------------------//
// Caching the chat input
const sendMessageButton = document.getElementById("send_message_button");
sendMessageButton.addEventListener("click", (e) => {
  const message = newMessageInput.value;
  webRTChandler.sendMessageUsingDataChannel(message);
  ui.appendMessage(message, true);
  newMessageInput.value = "";
});
//===============================================================================//

//===============================================================================//
//--------------------------- Handle Recording Button ---------------------------//
const startRecordingButton = document.getElementById("start_recording_button");
startRecordingButton.addEventListener("click", (e) => {
  recordingUtils.startRecording();
  ui.showRecordingPanel();
});
//------------------------- Handle Stop Recording Button -------------------------//
const stopRecordingButton = document.getElementById("stop_recording_button");
stopRecordingButton.addEventListener("click", (e) => {
  recordingUtils.stopRecording();
  ui.resetRecordingButton();
});
//------------------------ Handle Pause Recording Button ------------------------//
const pauseRecordingButton = document.getElementById("pause_recording_button");
pauseRecordingButton.addEventListener("click", (e) => {
  recordingUtils.pauseRecording();
  ui.switchRecordingButtons(true);
});
//------------------------ Handle Resume Recording Button ------------------------//
const resumeRecordingButton = document.getElementById(
  "resume_recording_button"
);

resumeRecordingButton.addEventListener("click", (e) => {
  recordingUtils.resumeRecording();
  ui.switchRecordingButtons(false);
});
//===============================================================================//

//===============================================================================//
// Hangup Video Call Button
const hangUpButton = document.getElementById("hang_up_button");

hangUpButton.addEventListener("click", (e) => {
  webRTChandler.handleHangUp();
});
//===============================================================================//

//===============================================================================//
// Hangup Chat Call Button
const hangUpChatButton = document.getElementById("finish_chat_call_button");

hangUpChatButton.addEventListener("click", (e) => {
  webRTChandler.handleHangUp();
});
//===============================================================================//