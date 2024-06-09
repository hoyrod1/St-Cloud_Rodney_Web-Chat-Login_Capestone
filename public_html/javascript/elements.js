//============================================================================//
//--------- This file will be managing the user call dialog interface --------//
//============================================================================//
export const getIncomingCallDialog = (
  callTypeInfo,
  acceptCallHandler,
  rejectCallHandler
) => {
  console.log("Getting a incoming call dialog!!!");
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
  const avatarImgPath = "./utilities/test-images/dialogAvatar.png";
  image.src = avatarImgPath;
  imageContainerDiv.appendChild(image);
  //----------------------------------------------------//

  //----------------------------------------------------//
  // Accept Call Button
  const buttonContainerDiv = document.createElement("div");
  buttonContainerDiv.classList.add("dialog_button_container");

  const acceptCallButton = document.createElement("button");
  acceptCallButton.classList.add("dialog_accept_call_button");

  const acceptCallImg = document.createElement("img");
  acceptCallImg.classList.add("dialog_button_image");
  const acceptCallImgPath = "./utilities/test-images/acceptCall.png";
  acceptCallImg.src = acceptCallImgPath;
  acceptCallButton.appendChild(acceptCallImg);
  // Reject Call Button
  const rejectCallButton = document.createElement("button");
  rejectCallButton.classList.add("dialog_reject_call_button");

  const rejectCallImg = document.createElement("img");
  rejectCallImg.classList.add("dialog_button_image");
  const rejectCallImgPath = "./utilities/test-images/rejectCall.png";
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
  return dialogDivWrap;
  //----------------------------------------------------//
};
