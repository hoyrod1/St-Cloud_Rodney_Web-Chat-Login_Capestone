import * as store from "./store.js";
import * as webRTChandler from "./webRTCHandler.js";
import * as ui from "./ui.js";
import * as constant from "./constant.js";
//======================================================================================//

//======================================================================================//
// Delcaring and setting the socketIO to null before storing the socket.io connection
let socketIO = null;
//======================================================================================//

//======================================================================================//
// This function will be registering the socketIO to listen emmit events to the server
export const registerSocketEvent = (socket) => {
  //------------------------------------------------------------------------------------//
  socketIO = socket;
  //------------------------------------------------------------------------------------//
  socket.on("connect", () => {
    // Caching the socket.io connection
    // console.log(
    //   `Successfully connected to wss/socket.io server with the id ${socket.id}`
    // );

    // Injecting the socket.id in the setSoketId function in the store.js file
    store.setSocketId(socket.id);
    // Injecting the socket.id into the updatePersonalCode function be displayed in the UI
    ui.updatePersonalCode(socket.id);
  });
  //------------------------------------------------------------------------------------//

  //------------------------------------------------------------------------------------//
  socket.on("pre-offer", (data) => {
    webRTChandler.handlePreOffer(data);
  });
  //------------------------------------------------------------------------------------//

  //------------------------------------------------------------------------------------//
  socket.on("pre-offer-answer", (data) => {
    webRTChandler.handlePreOfferAnswer(data);
  });
  //------------------------------------------------------------------------------------//

  //------------------------------------------------------------------------------------//
  socket.on("webRTC-signaling", (data) => {
    // webRTChandler.handlePreOfferAnswer(data);
    switch (data.type) {
      case constant.webRTCSignaling.OFFER:
        webRTChandler.handleWebRTCOffer(data);
        break;
      case constant.webRTCSignaling.ANSWER:
        webRTChandler.handleWebRTCAnswer(data);
        break;
      case constant.webRTCSignaling.ICE_CANDIDATE:
        webRTChandler.handleWebRTCCandidate(data);
        break;
      default:
        return;
    }
  });
  //------------------------------------------------------------------------------------//
};
//======================================================================================//

//======================================================================================//
export const sendPreOffer = (data) => {
  // const { callType, sendPersonalId } = data;
  // console.log(
  //   `Emmitting pre-offer from sendPreOffer function with the data value: ${callType} ${sendPersonalId}`
  // );
  // Emmitting a event "pre-offer" and passing the video or chat call type data
  socketIO.emit("pre-offer", data);
};
//======================================================================================//

//======================================================================================//
export const sendPreOfferAnswer = (data) => {
  // const { callerSocketID, preOfferAnswer } = data;
  // console.log(`Emmitting pre-offer-answer ${preOfferAnswer} ${callerSocketID}`);
  // Emmitting a event "pre-offer-answer" and passing the video or chat call type data
  socketIO.emit("pre-offer-answer", data);
};
//======================================================================================//

//======================================================================================//
export const sendDataUsingWebRTCSignaling = (data) => {
  socketIO.emit("webRTC-signaling", data);
};
//======================================================================================//
