import * as wss from "./wss.js";
import * as constant from "./constant.js";
import * as ui from "./ui.js";
import * as store from "./store.js";
//===============================================================================//
// INITIALIAZING THE connectedUsersDetail VARIABLE
// TO CACHE/STORE THE CONNECTED USERS CONNECTION DETAILS
let connectedUsersDetail;
//===============================================================================//

//===============================================================================//
// Get media data
const defaultConstraints = {
  audio: true,
  video: true,
};
export const getLocalPreview = () => {
  navigator.mediaDevices
    .getUserMedia(defaultConstraints)
    .then((stream) => {
      ui.updateLocalVideo(stream);
      store.setLocalStream(stream);
    })
    .catch((error) => {
      console.log(`The errorr trying to access the camera is: ${error}`);
    });
};
//===============================================================================//

//===============================================================================//
export const sendPreOffer = (callType, sendPersonalId) => {
  //----------------------------------------------------------------------------//
  connectedUsersDetail = {
    callType,
    socketId: sendPersonalId,
  };
  //-----------------------------------------------------------------------------//
  if (
    callType === constant.callType.CHAT_PERSONAL_CODE ||
    callType === constant.callType.VIDEO_PERSONAL_CODE
  ) {
    const sendingData = {
      callType,
      sendPersonalId,
    };
    // Calling the showIncomingCallDialog to render the reject incoming call dialog div
    ui.receivingCallDialog(callingDialogRejectCallHandler);
    // Calling sendPreOffer() from the wss.js file
    // And passing the sendingData object containing
    // The call type(Video or Chat) and the socket.io ID
    wss.sendPreOffer(sendingData);
  }
};
//===============================================================================//

//===============================================================================//
export const handlePreOffer = (data) => {
  // Destructure the data object containing the call type and the sockt.io ID
  const { callerSocketId, callType } = data;

  connectedUsersDetail = {
    socketId: callerSocketId,
    callType,
  };

  if (
    callType === constant.callType.CHAT_PERSONAL_CODE ||
    callType === constant.callType.VIDEO_PERSONAL_CODE
  ) {
    ui.showIncomingCallDialog(callType, acceptCallHandler, rejectCallHandler);
  }
};
//===============================================================================//

//===============================================================================//
const acceptCallHandler = () => {
  sendingPreOfferAnswer(constant.preOfferAnswer.CALL_ACCEPTED);
  console.log("Accepted Calling Handler");
  // Show dialog that callee was accepted
  ui.showCallElements(connectedUsersDetail.callType);
};
//===============================================================================//

//===============================================================================//
const rejectCallHandler = () => {
  console.log(
    `Call Handler ${constant.preOfferAnswer.CALL_REJECTED} from ${connectedUsersDetail.socketId}`
  );
  sendingPreOfferAnswer(constant.preOfferAnswer.CALL_REJECTED);
};
//===============================================================================//

//===============================================================================//
const callingDialogRejectCallHandler = () => {
  console.log("Reject Calling Handler");
};
//===============================================================================//

//===============================================================================//
// THIS FUNCTION SENDS A OBJECT WITH THE CONNECTED RECEIVERS USERS socket.io ID
// AND THE RECIEVERS ANSWER DECISION "CALL_ACCEPTED" OR "CALL_REJECTED"
const sendingPreOfferAnswer = (preOfferAnswer) => {
  const data = {
    callerSocketID: connectedUsersDetail.socketId,
    preOfferAnswer,
  };
  console.log("Sending Pre-Offer Handler");
  ui.remveAllDialog();
  wss.sendPreOfferAnswer(data);
};
//===============================================================================//

//===============================================================================//
export const handlePreOfferAnswer = (data) => {
  const { preOfferAnswer } = data;
  console.log(data);
  console.log(`This call is ${preOfferAnswer}`);
  ui.remveAllDialog();

  if (preOfferAnswer === constant.preOfferAnswer.CALLEE_NOT_FOUND) {
    // Show dialog that callee has not been found
    ui.showInfoDialog(preOfferAnswer);
  }

  if (preOfferAnswer === constant.preOfferAnswer.CALL_UNAVAILABLE) {
    // Show dialog that callee has not available
    ui.showInfoDialog(preOfferAnswer);
  }

  if (preOfferAnswer === constant.preOfferAnswer.CALL_REJECTED) {
    // Show dialog that call was rejected
    ui.showInfoDialog(preOfferAnswer);
  }

  if (preOfferAnswer === constant.preOfferAnswer.CALL_ACCEPTED) {
    // Show dialog that callee was accepted
    ui.showCallElements(connectedUsersDetail.callType);
  }
};
//===============================================================================//
