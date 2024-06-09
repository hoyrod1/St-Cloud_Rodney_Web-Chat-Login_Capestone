import * as wss from "./wss.js";
import * as constant from "./constant.js";
import * as ui from "./ui.js";
//===============================================================================//

//===============================================================================//
let connectedUsersDetail;
//===============================================================================//

//===============================================================================//
export const sendPreOffer = (callType, sendPersonalId) => {
  // console.log(sendingPersonalCode);
  // console.log(callType);
  const sendingData = {
    callType,
    sendPersonalId,
  };

  wss.sendPreOffer(sendingData);
};
//===============================================================================//

//===============================================================================//
export const handlePreOffer = (data) => {
  const { sendPersonalId, callType } = data;

  connectedUsersDetail = {
    socketID: sendPersonalId,
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
export const acceptCallHandler = () => {
  console.log("Accept Call Handler");
};
//===============================================================================//

//===============================================================================//
export const rejectCallHandler = () => {
  console.log("Reject Call Handler");
};
//===============================================================================//
