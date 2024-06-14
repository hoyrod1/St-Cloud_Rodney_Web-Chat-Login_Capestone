import * as constant from "./constant.js";
import * as elements from "./elements.js";
//============================================================================//
//--------------- This file will be managing the user interface --------------//
//============================================================================//

//============================================================================//
export const updatePersonalCode = (personalCode) => {
  const personalCodeParagraph = document.getElementById(
    "personal_code_paragraph"
  );

  personalCodeParagraph.style.fontSize = "12px";
  personalCodeParagraph.innerHTML = personalCode;
};
//============================================================================//

//============================================================================//
export const updateLocalVideo = (stream) => {
  const localVideo = document.getElementById("local_video");
  localVideo.srcObject = stream;

  localVideo.addEventListener("loadedmetadata", (e) => {
    localVideo.play();
  });
};
//============================================================================//

//============================================================================//
export const updateRemoteVideo = (stream) => {
  const remoteVideo = document.getElementById("remote_video");
  remoteVideo.srcObject = stream;
};
//============================================================================//

//============================================================================//
export const showIncomingCallDialog = (
  callType,
  acceptCallHandler,
  rejectCallHandler
) => {
  // Checking if call type recieved is for chat or video
  const callTypeInfo =
    callType === constant.callType.CHAT_PERSONAL_CODE ? "Chat" : "Video";
  // Cache return incoming call dialog div
  const incomingCallDialog = elements.getIncomingCallDialog(
    callTypeInfo,
    acceptCallHandler,
    rejectCallHandler
  );
  // Cache parent div to the incoming call dialog div
  const dialogParentDiv = document.getElementById("dialog");
  // If the dialog exist in the dialog parent div remove the dialog
  dialogParentDiv.querySelectorAll("*").forEach((dialog) => {
    dialog.remove();
  });
  // Render the incoming call dialog in the dialog parent div
  dialogParentDiv.appendChild(incomingCallDialog);
};
//============================================================================//

//============================================================================//
export const receivingCallDialog = (rejectCallHandler) => {
  const receiveCallDialog = elements.receivedCallDialog(rejectCallHandler);
  // Cache parent div to the incoming call dialog div
  const dialogParentDiv = document.getElementById("dialog");
  // If the dialog exist in the dialog parent div remove the dialog
  dialogParentDiv.querySelectorAll("*").forEach((dialog) => {
    dialog.remove();
  });
  // Render the incoming call dialog in the dialog parent div
  dialogParentDiv.appendChild(receiveCallDialog);
};
//============================================================================//

//============================================================================//
export const showInfoDialog = (preOfferAnswer) => {
  let infoDialog = null;

  if (preOfferAnswer === constant.preOfferAnswer.CALL_REJECTED) {
    // Show dialog that call was rejected
    infoDialog = elements.getInfoDialog(
      "Call Rejected",
      "Caller Rejected Your Call"
    );
  }

  if (preOfferAnswer === constant.preOfferAnswer.CALLEE_NOT_FOUND) {
    // Show dialog that callee has not been found
    infoDialog = elements.getInfoDialog(
      "Caller ID Not Found",
      "Please check you personal code"
    );
  }

  if (preOfferAnswer === constant.preOfferAnswer.CALL_UNAVAILABLE) {
    // Show dialog that callee has not available
    infoDialog = elements.getInfoDialog(
      "Call unavailable",
      "Caller is busy, please try again later"
    );
  }
  //--------------------------------------------------------------------------//
  if (infoDialog) {
    const dialog = document.getElementById("dialog");
    dialog.appendChild(infoDialog);
    // set time for dialog to be removed from page
    setTimeout(() => {
      removeAllDialog();
    }, 5000);
  }
};
//============================================================================//

//============================================================================//
export const removeAllDialog = () => {
  // Cache parent div to the incoming call dialog div
  const dialogParentDiv = document.getElementById("dialog");
  // If the dialog exist in the dialog parent div remove the dialog
  dialogParentDiv.querySelectorAll("*").forEach((dialog) => {
    dialog.remove();
  });
};
//============================================================================//

//============================================================================//
export const showCallElements = (callType) => {
  if (callType === constant.callType.CHAT_PERSONAL_CODE) {
    // Show chat call element
    showChatCallElements();
  }

  if (callType === constant.callType.VIDEO_PERSONAL_CODE) {
    // Show video call element
    showVideoCallElements();
  }
};
//============================================================================//

//============================================================================//
// Show Chat Elements
const showChatCallElements = () => {
  const finishConnectionChatButtonContainer = document.getElementById(
    "finish_chat_button_container"
  );
  showElement(finishConnectionChatButtonContainer);
  // Cache message dive
  const newMessageInput = document.getElementById("new_message");
  // Show message
  showElement(newMessageInput);
  // enable blocker dive
  disableDashboard();
};
// Show Video Elements
const showVideoCallElements = () => {
  const callButtons = document.getElementById("call_buttons");
  showElement(callButtons);
  // Hide Video Placeholder
  const videoPlaceholder = document.getElementById("video_placeholder");
  hideElement(videoPlaceholder);
  // Show remote video
  const remoteVideo = document.getElementById("remote_video");
  showElement(remoteVideo);
  // Cache message dive
  const newMessageInput = document.getElementById("new_message");
  // Show message
  showElement(newMessageInput);
  // enable blocker dive
  disableDashboard();
};
//============================================================================//

//============================== UI CALL BUTTON ==============================//
const micOnImgSrc = "./utilities/test-images/mic.png";
const micOffImgSrc = "./utilities/test-images/micOff.png";
export const updateMicButton = (micActive) => {
  const micButtonImage = document.getElementById("mic_button_image");
  micButtonImage.src = micActive ? micOffImgSrc : micOnImgSrc;
};
//============================================================================//

//============================= UI VIDEO BUTTON ==============================//
const cameraOnImgSrc = "./utilities/test-images/camera.png";
const cameraOffImgSrc = "./utilities/test-images/cameraOff.png";
export const updateCameraButton = (cameraActive) => {
  const cameraButtonImage = document.getElementById("camera_button_image");
  cameraButtonImage.src = cameraActive ? cameraOffImgSrc : cameraOnImgSrc;
};
//============================================================================//

//======================== UI HELPER FUNCTIONS ===============================//
const enableDashboard = () => {
  // Cache dashboard blocker div to enable blur
  const dashBoradBlocker = document.getElementById("dashboard_blur");
  // If the dashboard blocker does not contains the classname "display_none" add it
  if (!dashBoradBlocker.classList.contains("display_none")) {
    dashBoradBlocker.classList.add("display_none");
  }
};
//============================================================================//

//============================================================================//
const disableDashboard = () => {
  // Cache dashboard blocker div to disable blur
  const dashBoradBlocker = document.getElementById("dashboard_blur");
  // If the dashboard contains the classname "display_none" remove it
  if (dashBoradBlocker.classList.contains("display_none")) {
    dashBoradBlocker.classList.remove("display_none");
  }
};
//============================================================================//

//============================================================================//
const hideElement = (element) => {
  // If the dialog exist in the dialog parent div remove the dialog
  if (!element.classList.contains("display_none")) {
    element.classList.add("display_none");
  }
};
//============================================================================//

//============================================================================//
const showElement = (element) => {
  // If the dashboard contains the classname "display_none" then remove it
  if (element.classList.contains("display_none")) {
    element.classList.remove("display_none");
  }
};
//============================================================================//
