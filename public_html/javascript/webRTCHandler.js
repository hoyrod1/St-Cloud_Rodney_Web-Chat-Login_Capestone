import * as wss from "./wss.js";
//===============================================================================//

//===============================================================================//
export const sendPreOffer = (callType, sendingPersonalCode) => {
  // console.log(sendingPersonalCode);
  // console.log(callType);
  const sendingData = {
    callType,
    sendingPersonalCode,
  };

  wss.sendPreOffer(sendingData);
};
