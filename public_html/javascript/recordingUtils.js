import * as store from "./store.js";
// recordedChunks will store the recorded video/audio media data
// To be saved on the computer
const recordedChunks = [];
// mediaRecorder will hold the recorded video/audio data
let mediaRecorder;
// vp9Codec media recording codec option is great quality
// if it is supported for your browser
const vp9Codec = "video/webm; codecs=vp=9";
const vp9Options = { mimeType: vp9Codec };
//============================================================================//

//============================================================================//
// startRecording function handles the video recoding for the video chat App //
export const startRecording = () => {
  // cache the remote stream
  const remoteStream = store.getState().remoteStream;
  // Check if Media recorder mim type is supported
  if (MediaRecorder.isTypeSupported(vp9Codec)) {
    mediaRecorder = new MediaRecorder(remoteStream, vp9Options);
  } else {
    // If the Media recorder codec mim type is not supported
    // Media recorer will choose the best option
    mediaRecorder = new MediaRecorder(remoteStream);
  }
  // event listener will check if Media data is available
  mediaRecorder.ondataavailable = handleDataAvailable;
  // Start recording
  mediaRecorder.start();
};
//============================================================================//

//======================= Handle Pause Video Recording =======================//
export const pauseRecording = () => {
  mediaRecorder.pause();
};
//=============================================================================//

//====================== Handle Resuming Video Recording ======================//
export const resumeRecording = () => {
  mediaRecorder.resumeRecording();
};
//=============================================================================//

//======================== Handle Stop Video Recording ========================//
export const stopRecording = () => {
  mediaRecorder.stop();
};
//============================================================================//

//=========================== Handle Video Download ===========================//
const downloadRecordedVideo = () => {
  const blob = new Blob(recordedChunks, {
    type: "video/webm",
  });

  const url = URL.createObjectURL(blob);
  const aTag = document.createElement("a");
  document.body.appendChild(aTag);
  a.href = url;
  aTag.style = "display: none;";
  a.download = "recording.webm";
  a.click();
  window.URL.revokeObjectURL(url);
};
//===============================================================================//

//============================== Handle Video Data ==============================//
const handleDataAvailable = (e) => {
  if (e.data.size > 0) {
    // If there is recorded media data add to the recordedChunks Array
    // This will be saved on the computer
    recordedChunks.push(e.data);
    // Download recorded video after the video recorder stops recording
    downloadRecordedVideo();
  }
};
//================================================================================//
