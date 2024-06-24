//============================================================================//
//--------- This file will be managing the user call dialog interface --------//
//============================================================================//

//****************************************************************************//
export const getIncomingCallDialog = (
  callTypeInfo,
  acceptCallHandler,
  rejectCallHandler
) => {
  //----------------------------------------------------//
  const dialogDivWrap = document.createElement("div");
  dialogDivWrap.classList.add("dialog_wrapper");
  //----------------------------------------------------//

  //----------------------------------------------------//
  const dialogContentDiv = document.createElement("div");
  dialogContentDiv.classList.add("dialog_content");
  //----------------------------------------------------//

  //----------------------------------------------------//
  const title = document.createElement("p");
  title.classList.add("dialog_title");
  title.innerHTML = `Incoming ${callTypeInfo} call`;
  //----------------------------------------------------//

  //----------------------------------------------------//
  const imageContainerDiv = document.createElement("div");
  imageContainerDiv.classList.add("dialog_image_container");
  const image = document.createElement("img");
  const avatarImgPath = "./utilities/test-images/dialogPic.png";
  image.src = avatarImgPath;
  imageContainerDiv.appendChild(image);
  //----------------------------------------------------//

  //----------------------------------------------------//
  // Button container
  const buttonContainerDiv = document.createElement("div");
  buttonContainerDiv.classList.add("dialog_button_container");

  // Accept Call Button
  const acceptCallButton = document.createElement("button");
  acceptCallButton.classList.add("dialog_accept_call_button");

  const acceptCallImg = document.createElement("img");
  acceptCallImg.classList.add("dialog_button_image");
  const acceptCallImgPath = "./utilities/test-images/accept.png";
  acceptCallImg.src = acceptCallImgPath;
  acceptCallButton.appendChild(acceptCallImg);
  // Reject Call Button
  const rejectCallButton = document.createElement("button");
  rejectCallButton.classList.add("dialog_reject_call_button");

  const rejectCallImg = document.createElement("img");
  rejectCallImg.classList.add("dialog_button_image");
  const rejectCallImgPath = "./utilities/test-images/reject.png";
  rejectCallImg.src = rejectCallImgPath;
  rejectCallButton.appendChild(rejectCallImg);
  //----------------------------------------------------//

  //====================================================//
  buttonContainerDiv.appendChild(acceptCallButton);
  buttonContainerDiv.appendChild(rejectCallButton);
  //====================================================//
  dialogContentDiv.appendChild(title);
  dialogContentDiv.appendChild(imageContainerDiv);
  dialogContentDiv.appendChild(buttonContainerDiv);
  //====================================================//
  dialogDivWrap.appendChild(dialogContentDiv);
  //====================================================//

  //----------------------------------------------------//
  // const dialogHTML = document.getElementById("dialog");
  // dialogHTML.appendChild(dialogDivWrap);
  //----------------------------------------------------//

  //----------------------------------------------------//
  // addEventListener TO DETERMINE  IF CALL IS ACCEPTED
  acceptCallButton.addEventListener("click", (e) => {
    acceptCallHandler();
  });
  // addEventListener TO DETERMINE  IF CALL IS ACCEPTED
  rejectCallButton.addEventListener("click", (e) => {
    rejectCallHandler();
  });
  //----------------------------------------------------//

  //----------------------------------------------------//
  return dialogDivWrap;
  //----------------------------------------------------//
};
//****************************************************************************//

//****************************************************************************//
export const receivedCallDialog = (rejectCallHandler) => {
  //----------------------------------------------------//
  const dialogDivWrap = document.createElement("div");
  dialogDivWrap.classList.add("dialog_wrapper");
  //----------------------------------------------------//
  //----------------------------------------------------//
  const dialogContentDiv = document.createElement("div");
  dialogContentDiv.classList.add("dialog_content");
  //----------------------------------------------------//
  //----------------------------------------------------//
  const title = document.createElement("p");
  title.classList.add("dialog_title");
  title.innerHTML = `Calling`;
  //----------------------------------------------------//
  //----------------------------------------------------//
  const imageContainerDiv = document.createElement("div");
  imageContainerDiv.classList.add("dialog_image_container");
  const image = document.createElement("img");
  const avatarImgPath = "./utilities/test-images/dialogPic.png";
  image.src = avatarImgPath;
  imageContainerDiv.appendChild(image);
  //----------------------------------------------------//
  // Button container
  const buttonContainerDiv = document.createElement("div");
  buttonContainerDiv.classList.add("dialog_button_container");
  // Reject incoming call Button
  const rejectCallButton = document.createElement("button");
  rejectCallButton.classList.add("dialog_reject_call_button");
  // Reject incoming call Button image
  const rejectCallImg = document.createElement("img");
  rejectCallImg.classList.add("dialog_button_image");
  const rejectCallImgPath = "./utilities/test-images/reject.png";
  rejectCallImg.src = rejectCallImgPath;
  rejectCallButton.append(rejectCallImg);
  //====================================================//
  buttonContainerDiv.appendChild(rejectCallButton);
  //====================================================//
  dialogContentDiv.appendChild(title);
  dialogContentDiv.appendChild(imageContainerDiv);
  dialogContentDiv.appendChild(buttonContainerDiv);
  //====================================================//
  dialogDivWrap.appendChild(dialogContentDiv);
  //====================================================//
  rejectCallButton.addEventListener("click", (e) => {
    rejectCallHandler();
  });
  //----------------------------------------------------//
  return dialogDivWrap;
  //----------------------------------------------------//
};
//****************************************************************************//

//****************************************************************************//
export const getInfoDialog = (dialogTitle, descriptionText) => {
  //----------------------------------------------------//
  const dialogDivWrap = document.createElement("div");
  dialogDivWrap.classList.add("dialog_wrapper");
  //----------------------------------------------------//
  //----------------------------------------------------//
  const dialogContentDiv = document.createElement("div");
  dialogContentDiv.classList.add("dialog_content");
  //----------------------------------------------------//
  //----------------------------------------------------//
  const title = document.createElement("p");
  title.classList.add("dialog_title");
  title.innerHTML = dialogTitle;
  //----------------------------------------------------//
  //----------------------------------------------------//
  const imageContainerDiv = document.createElement("div");
  imageContainerDiv.classList.add("dialog_image_container");
  const image = document.createElement("img");
  const avatarImgPath = "./utilities/test-images/dialog.png";
  image.src = avatarImgPath;
  imageContainerDiv.appendChild(image);
  //----------------------------------------------------//
  //----------------------------------------------------//
  const descriptionPtag = document.createElement("p");
  descriptionPtag.classList.add("dialog_description");
  descriptionPtag.innerHTML = descriptionText;
  //====================================================//
  //====================================================//
  dialogContentDiv.appendChild(title);
  dialogContentDiv.appendChild(imageContainerDiv);
  dialogContentDiv.appendChild(descriptionPtag);
  //====================================================//
  dialogDivWrap.appendChild(dialogContentDiv);
  //====================================================//
  //----------------------------------------------------//
  return dialogDivWrap;
  //----------------------------------------------------//
};
//****************************************************************************//

//****************************************************************************//
export const getLeftMessage = (message) => {
  const messageContainer = document.createElement("div");
  messageContainer.classList.add("message_left_container");
  const messageParagraph = document.createElement("p");
  messageParagraph.classList.add("message_left_paragraph");
  messageParagraph.innerHTML = message;
  messageContainer.appendChild(messageParagraph);
  return messageContainer;
};
export const getRightMessage = (message) => {
  const messageContainer = document.createElement("div");
  messageContainer.classList.add("message_right_container");
  const messageParagraph = document.createElement("p");
  messageParagraph.classList.add("message_right_paragraph");
  messageParagraph.innerHTML = message;
  messageContainer.appendChild(messageParagraph);
  return messageContainer;
};
//****************************************************************************//
