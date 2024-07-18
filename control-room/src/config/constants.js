import { INITIAL_PARTICIPANTS_DUMMY } from "../contexts/testData";

export const ENVIRONMENT = {
  prod: "prod",
  dev: "dev",
};

export const ENV = ENVIRONMENT.dev;

// parent page vars
export const EVENT_ID =
  ENV === ENVIRONMENT.dev ? "53233" : parent.parent.vbConference;
export const PIN = ENV === ENVIRONMENT.dev ? "8572041" : parent.parent.vbPin;
export const NODE_ADDRESS =
  ENV === ENVIRONMENT.dev
    ? "alphacn.webcasts.com"
    : parent.parent.conferencing_node;
export const INITIAL_TOKEN =
  ENV === ENVIRONMENT.dev ? "123" : parent.parent.pexipClientToken;
export const INITIAL_PARTICIPANT =
  ENV === ENVIRONMENT.dev ? INITIAL_PARTICIPANTS_DUMMY : [];
export const VB_URI_NAME =
  ENV === ENVIRONMENT.dev
    ? "Richard Felix"
    : decodeURIComponent(parent.parent.fullNameVb);
export const MAX_PARTICIPANTS =
  ENV === ENVIRONMENT.dev ? 20 : parent.parent.sMaxRoomParticipants;

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
  unlock: "unlock",
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
  openDtmf: "Open DTMP Keypad",
  editProfile: "Edit Presenter Profile",
  submitNewOverlayName: "Submit New Overlay Name",
  admit: "Admit",
  deny: "Deny",
  openActionMenu: "Open Action Menu",
};

export const BUTTON_NAMES = {
  video: "video",
  audio: "audio",
  spolight: "spolight",
  admit: "admit",
  deny: "deny",
};

export const PROTOCOLS = {
  rtmp: "rtmp",
  api: "api",
  webrtc: "webrtc",
  h323: "h323",
  teams: "teams",
  mssip: "mssip",
  sip: "sip",
};

export const HEADERS = {
  dtmfHeader: "DTMF Keypad",
  presenters: "Presenters",
  presenterProfile: "Presenter Profile",
  waitingToJoin: "Waiting to Join",
  streams: "Streams",
  presenters: "Presenters",
};

export const SERVICE_TYPE = {
  connecting: "connecting",
  waiting_room: "waiting_room",
  ivr: "ivr",
  conference: "conference",
  lecture: "lecture",
  gateway: "gateway",
  test_call: "test_call",
  conference: "conference",
};

export const WAITING_TO_JOIN_LIST_SERVICE_TYPE = [SERVICE_TYPE.waiting_room];

export const PARTICIPANTS_LIST_PROTOCOLS = [
  PROTOCOLS.webrtc,
  PROTOCOLS.h323,
  PROTOCOLS.teams,
  PROTOCOLS.mssip,
  PROTOCOLS.sip,
];

export const STREAM_LIST_PROTOCOLS = [PROTOCOLS.rtmp, PROTOCOLS.api];
