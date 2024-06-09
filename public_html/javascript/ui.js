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

  personalCodeParagraph.style.fontSize = "11px";
  personalCodeParagraph.innerHTML = personalCode;
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
  const incomingCallDialog = elements.getIncomingCallDialog();
};
//============================================================================//
