import { INITIAL_PARTICIPANTS_DUMMY } from "../contexts/testData";

export const ENVIRONMENT = {
  prod: "prod",
  dev: "dev",
};

export const ENV = ENVIRONMENT.prod;

// parent page vars
export const EVENT_ID =
  ENV === ENVIRONMENT.dev ? "123" : parent.parent.vbConference;
export const PIN = ENV === ENVIRONMENT.dev ? "123" : parent.parent.vbPin;
export const NODE_ADDRESS =
  ENV === ENVIRONMENT.dev
    ? "alphacn.webcasts.com"
    : parent.parent.conferencing_node;
export const INITIAL_TOKEN =
  ENV === ENVIRONMENT.dev ? "123" : parent.parent.pexipClientToken;
export const INITIAL_PARTICIPANT =
  ENV === ENVIRONMENT.dev ? INITIAL_PARTICIPANTS_DUMMY : [];
export const VB_URI_NAME =
  ENV === ENVIRONMENT.dev ? null : decodeURIComponent(parent.parent.fullNameVb);
export const MAX_PARTICIPANTS =
  ENV === ENVIRONMENT.dev ? null : parent.parent.sMaxRoomParticipants;

export const EVENTS = {
  token_refresh: "token_refresh",
  participants: "participants",
  layoutUpdate: "layoutUpdate",
  connected: "connected",
  disconnected: "disconnected",
  stage: "stage",
  participantJoined: "participantJoined",
  participantLeft: "participantLeft",
  raiseHand: "raiseHand",
  me: "me",
  applicationMessage: "applicationMessage",
  transfer: "transfer",
  presentationConnectionStateChange: "presentationConnectionStateChange",
  directMessage: "directMessage",
  authenticatedWithConference: "authenticatedWithConference",
  message: "message",
  conferenceStatus: "conferenceStatus",
};

export const API_CALLS = {
  spotlightoff: "spotlightoff",
  spotlighton: "spotlighton",
  video_unmuted: "video_unmuted",
  video_muted: "video_muted",
  unmute: "unmute",
  mute: "mute",
  chair: "chair",
  guest: "guest",
  allowShares: "allowrxpresentation",
  denyShares: "denyrxpresentation",
  dtmf: "dtmf",
  overlaytext: "overlaytext",
  role: "role",
  disconnect: "disconnect",
  raiseHand: "buzz",
  lowerHand: "clearbuzz",
};

export const ROLES = {
  chair: "chair",
  guest: "guest",
  hostSlashString: "/Host",
};

export const ALT_TAGS = {
  spotlightOn: "Spotlight On",
  spotlightOff: "Spotlight Off",
  videoOff: "Video Off",
  videoOn: "Video On",
  audioOff: "Audio Off",
  audioOn: "Audio On",
  makeHost: "Make Host",
  makeguest: "Make Guest",
  remove: "Remove Participant",
  raiseHand: "Raise Hand",
  loweredHand: "Lower Hand",
  allowShares: "Enable Recieve Shares",
  denyShares: "Disable Recieve Shares",
};

export const BUTTON_NAMES = {
  video: "video",
  audio: "audio",
  spolight: "spolight",
};

export const PROTOCOLS = {
  rtmp: "rtmp",
  api: "api",
  webrtc: "webrtc",
  h323: "h323",
  teams: "teams",
  mssip: "mssip",
};
