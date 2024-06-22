import * as wss from "./wss.js";
import * as constant from "./constant.js";
import * as ui from "./ui.js";
import * as store from "./store.js";
//===============================================================================//
// INITIALIAZING THE connectedUsersDetail VARIABLE
// TO CACHE/STORE THE CONNECTED USERS CONNECTION DETAILS
let connectedUsersDetail;
// INITIALIAZING THE peerConnection VARIABLE
// TO CACHE/STORE THE RECIEVERS CONNECTION DETAILS
let peerConnection;
// Initializing data channel event listener
let dataChannel;
//===============================================================================//

//===============================================================================//
// Get media data
const defaultConstraints = {
  audio: true,
  video: true,
};
// Configuration to connect to the stun server
const configuration = {
  iceServer: [
    {
      urls: "stun:stun.1.google.com:13902",
    },
  ],
};
//===============================================================================//

//===============================================================================//
export const getLocalPreview = () => {
  navigator.mediaDevices
    .getUserMedia(defaultConstraints)
    .then((stream) => {
      ui.updateLocalVideo(stream);
      ui.showVideoCallButtons();
      store.setCallState(constant.callSate.CALL_AVAILABLE);
      store.setLocalStream(stream);
    })
    .catch((error) => {
      console.log(`The errorr trying to access the camera is: ${error}`);
    });
};
//===============================================================================//

//===============================================================================//
const createPeerConnection = () => {
  // Defining RTCPeerConnection Object
  peerConnection = new RTCPeerConnection(configuration);
  // Caching message from the chat
  dataChannel = peerConnection.createDataChannel("chat");
  // Check for event from datachannel
  peerConnection.ondatachannel = (event) => {
    const dataChannel = event.channel;
    // Check if data channel is open
    dataChannel.onopen = () => {
      console.log("Peer connection is ready to recieve data channel message");
    };
    // When the message is received it is passed with the event and converted to JSON
    dataChannel.onmessage = (event) => {
      // console.log("Message came from data channel");
      const message = JSON.parse(event.data);
      // console.log(message);
      ui.appendMessage(message);
    };
  };

  peerConnection.onicecandidate = (event) => {
    console.log(`Receiving ice candidate from stun server with the event:`);
    console.log(event);
    if (event.candidate) {
      // send our ice candidate
      wss.sendDataUsingWebRTCSignaling({
        connectedUserSocketId: connectedUsersDetail.socketId,
        type: constant.webRTCSignaling.ICE_CANDIDATE,
        candidate: event.candidate,
      });
    }
  };

  peerConnection.onconnectionstatechange = (event) => {
    if (peerConnection.connectionState === "connected") {
      console.log(
        `Succenfully connectedwith our peer with: ${peerConnection.connectionState}`
      );
    }
  };

  // Receive track
  const remoteStream = new MediaStream();
  store.setRemoteStream(remoteStream);
  ui.updateRemoteVideo(remoteStream);

  peerConnection.ontrack = (event) => {
    remoteStream.addTrack(event.track);
  };

  // Add our stream to peer connection
  if (connectedUsersDetail.callType === constant.callType.VIDEO_PERSONAL_CODE) {
    const localStream = store.getState().localStream;

    for (const track of localStream.getTracks()) {
      peerConnection.addTrack(track, localStream);
    }
  }
};
//===============================================================================//
export const sendMessageUsingDataChannel = (message) => {
  // Converting the message from the data channel to strings
  const stringifiedMessage = JSON.stringify(message);
  dataChannel.send(stringifiedMessage);
};
//===============================================================================//

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
    // This sets the call state for the receiving caller to unavailable
    // When reciving caller is on a video chat call already
    store.setCallState(constant.callSate.CALL_UNAVAILABLE);
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
  // Check to see if recieving caller is not on available
  // If unavailable set pre offer answer to CALL_UNAVAILABLE
  if (!checkCallPossibility()) {
    return sendingPreOfferAnswer(
      constant.preOfferAnswer.CALL_UNAVAILABLE,
      callerSocketId
    );
  }

  connectedUsersDetail = {
    socketId: callerSocketId,
    callType,
  };

  // This sets the call state for the receiving caller to unavailable
  // When reciving caller is on a video chat call already
  store.setCallState(constant.callSate.CALL_UNAVAILABLE);

  // If receiving caller is available show incoming call or chat dialog
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
  // Create peer connection
  createPeerConnection();
  // Show dialog that callee was accepted
  ui.showCallElements(connectedUsersDetail.callType);
};
//===============================================================================//

//===============================================================================//
const rejectCallHandler = () => {
  console.log(
    `Call Handler ${constant.preOfferAnswer.CALL_REJECTED} from ${connectedUsersDetail.socketId}`
  );
  sendingPreOfferAnswer();
  setIncomingCallsAvailable();
  sendingPreOfferAnswer(constant.preOfferAnswer.CALL_REJECTED);
};
//===============================================================================//

//===============================================================================//
const callingDialogRejectCallHandler = () => {
  console.log("Reject Calling Handler");
  const data = {
    connectedUserSocketId: connectedUsersDetail.socketId,
  };
  closePeerConnectionAndResetState();

  wss.sendUserHangedUp(data);
};
//===============================================================================//

//===============================================================================//
// THIS FUNCTION SENDS A OBJECT WITH THE CONNECTED RECEIVERS USERS socket.io ID
// AND THE RECIEVERS ANSWER DECISION "CALL_ACCEPTED" OR "CALL_REJECTED"
const sendingPreOfferAnswer = (preOfferAnswer, callerSocketId = null) => {
  const callSoketId = callerSocketId
    ? callerSocketId
    : connectedUsersDetail.socketId;
  const data = {
    callerSocketID: callSoketId,
    preOfferAnswer,
  };
  console.log("Sending Pre-Offer Handler");
  ui.removeAllDialog();
  wss.sendPreOfferAnswer(data);
};
//===============================================================================//

//===============================================================================//
export const handlePreOfferAnswer = (data) => {
  const { preOfferAnswer } = data;
  // console.log(data);
  // console.log(`This call is ${preOfferAnswer}`);
  ui.removeAllDialog();

  if (preOfferAnswer === constant.preOfferAnswer.CALLEE_NOT_FOUND) {
    // Show dialog that callee has not been found
    ui.showInfoDialog(preOfferAnswer);
    // This function sets the call state for the receiving caller to available
    // When reciving caller is not on a video chat call already
    setIncomingCallsAvailable();
  }

  if (preOfferAnswer === constant.preOfferAnswer.CALL_UNAVAILABLE) {
    // Show dialog that callee has not available
    ui.showInfoDialog(preOfferAnswer);
    // This sets the call state for the receiving caller to available
    // When reciving caller is not on a video chat call already
    setIncomingCallsAvailable();
  }

  if (preOfferAnswer === constant.preOfferAnswer.CALL_REJECTED) {
    // Show dialog that call was rejected
    ui.showInfoDialog(preOfferAnswer);
    // This sets the call state for the receiving caller to available
    // When reciving caller is not on a video chat call already
    setIncomingCallsAvailable();
  }

  if (preOfferAnswer === constant.preOfferAnswer.CALL_ACCEPTED) {
    // Show dialog that callee was accepted
    ui.showCallElements(connectedUsersDetail.callType);
    // Create peer connection
    createPeerConnection();
    sendWebRTCOffer();
  }
};
//===============================================================================//

//===============================================================================//
// Sending offer with SDP info from caller to the receiving caller
const sendWebRTCOffer = async () => {
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
  wss.sendDataUsingWebRTCSignaling({
    connectedUserSocketId: connectedUsersDetail.socketId,
    type: constant.webRTCSignaling.OFFER,
    offer: offer,
  });
};
//===============================================================================//

//===============================================================================//
// Receiver handling callers offer and returning a anwser with SDP information
export const handleWebRTCOffer = async (data) => {
  await peerConnection.setRemoteDescription(data.offer);
  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);
  wss.sendDataUsingWebRTCSignaling({
    connectedUserSocketId: connectedUsersDetail.socketId,
    type: constant.webRTCSignaling.ANSWER,
    answer: answer,
  });
};
//===============================================================================//

//===============================================================================//
export const handleWebRTCAnswer = async (data) => {
  console.log(`Handling webRTC answer`);
  console.log(data);
  await peerConnection.setRemoteDescription(data.answer);
};
//===============================================================================//

//===============================================================================//
export const handleWebRTCCandidate = async (data) => {
  console.log(data);
  console.log("Handling incoming web RTC candidate");
  try {
    await peerConnection.addIceCandidate(data.candidate);
  } catch (error) {
    console.error(
      "Error occured when trying to add the receiving ice candidate",
      error
    );
  }
};
//===============================================================================//

//===============================================================================//
//-------------------------------------------------------------------------------//
let screenSharingStream;
//-------------------------------------------------------------------------------//
export const switchBetweenCameraAndScreeningSharing = async (
  screenSharingActive
) => {
  if (screenSharingActive) {
    //--------------------- Disable screen sharing ---------------------//
    // Cache the local stream that will display the video
    const localStream = store.getState().localStream;
    const senders = peerConnection.getSenders();
    // Get the specific senders video and audio track
    const sender = senders.find((sender) => {
      // Checking if the senders video and audio track is the same as
      // as the sharing audio and video track
      return sender.track.kind === localStream.getVideoTracks()[0].kind;
    });
    // If sender is found the video and audio track is replaced
    // Video sharing track
    if (sender) {
      sender.replaceTrack(localStream.getVideoTracks()[0]);
    }
    // Stop sharing stream
    store
      .getState()
      .screenSharingStream.getTracks()
      .forEach((track) => track.stop());
    // This will store Video sharing track
    // the (!) before "screenSharingActive" is necessary
    // to toggle between the screen sharing boolean state
    store.setScreenSharingActive(!screenSharingActive);
    // This updates the ui with the video screen
    ui.updateLocalVideo(localStream);
  } else {
    //---------------------- Enable screen sharing ----------------------//
    console.log(`Enable screen sharing`);
    try {
      // The getDisplayMedia() gets access to screen sharing screen
      screenSharingStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      // Setting the screen sharing state
      store.setScreenSharingStream(screenSharingStream);
      // Replace the audio and video track from the sender
      const senders = peerConnection.getSenders();
      // Get the specific senders video and audio track
      const sender = senders.find((sender) => {
        // Checking if the senders video and audio track is the same as
        // as the sharing audio and video track
        return (
          sender.track.kind === screenSharingStream.getVideoTracks()[0].kind
        );
      });
      // If sender is found the video and audio track is replaced
      // Video sharing track
      if (sender) {
        sender.replaceTrack(screenSharingStream.getVideoTracks()[0]);
      }
      // This will store Video sharing track
      // the (!) before "screenSharingActive" is necessary
      // to toggle between the screen sharing boolean state
      store.setScreenSharingActive(!screenSharingActive);
      // This updates the ui with the video sharing screen
      ui.updateLocalVideo(screenSharingStream);
    } catch (error) {
      console.error("There was an error sharing the screen", error);
    }
  }
};
//===============================================================================//

//===============================================================================//
// Hang up video and chat call
export const handleHangUp = () => {
  const data = {
    connectedUserSocketId: connectedUsersDetail.socketId,
  };
  wss.sendUserHangedUp(data);
  closePeerConnectionAndResetState();
};
//===============================================================================//

//===============================================================================//
export const handleConnectedUserHangsUp = () => {
  closePeerConnectionAndResetState();
};
//===============================================================================//

//===============================================================================//
// Complete the hang up closing peer connection
const closePeerConnectionAndResetState = () => {
  if (peerConnection) {
    peerConnection.close();
    peerConnection = null;
  }
  // Check for active camera and mic
  if (
    connectedUsersDetail.callType === constant.callType.VIDEO_PERSONAL_CODE ||
    connectedUsersDetail.callType === constant.callType.VIDEO_STRANGERL_CODE
  ) {
    store.getState().localStream.getVideoTracks()[0].enable = true;
    store.getState().localStream.getAudioTracks()[0].enable = true;
  }
  // Set the call state to available to receive video and or chat calls
  ui.updateUIAfterHangup(connectedUsersDetail.callType);
  setIncomingCallsAvailable();
  connectedUsersDetail = null;
};
//===============================================================================//

//============================================================================//
export const checkCallPossibility = (callType) => {
  const callState = store.getState().callState;
  if (callState === constant.callSate.CALL_AVAILABLE) {
    // If the receiving caller is available for video call return true
    return true;
  }

  if (
    (callType === constant.callType.VIDEO_PERSONAL_CODE ||
      callType === constant.callType.VIDEO_STRANGERL_CODE) &&
    callState === constant.callSate.CALL_AVAILABLE_ONLY_CHAT
  ) {
    // If the receiving caller is not available for video call return false
    return false;
  }
  // If the receiving caller is not available for any call type return false
  return false;
};
//============================================================================//

//============================================================================//
const setIncomingCallsAvailable = () => {
  const localStream = store.getState().localStream;
  if (localStream) {
    store.setCallState(constant.callSate.CALL_AVAILABLE);
  } else {
    store.setCallState(constant.callSate.CALL_AVAILABLE_ONLY_CHAT);
  }
};
//============================================================================//
