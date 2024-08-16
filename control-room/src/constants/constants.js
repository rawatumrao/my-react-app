import { INITIAL_PARTICIPANTS_DUMMY } from "../contexts/testData";

export const ENVIRONMENT = {
  prod: "prod",
  dev: "dev",
};

export const ENV = ENVIRONMENT.prod;

// parent page vars
const pexipDataJsonVar = parent?.parent?.pexipDataJson;
const SAVED_PARTICIPANTS = pexipDataJsonVar?.saveVbParticpants
  ? pexipDataJsonVar?.saveVbParticpants
  : [];
export const YOUR_VB_UUID =
  ENV === ENVIRONMENT.dev
    ? "b4c788fa-fe44-4081-863c-52a3d4f66194"
    : pexipDataJsonVar?.myVBuuid;
export const EVENT_ID =
  ENV === ENVIRONMENT.dev ? "123" : pexipDataJsonVar?.vbConference;
export const PIN = ENV === ENVIRONMENT.dev ? "123" : pexipDataJsonVar?.vbPin;
export const NODE_ADDRESS =
  ENV === ENVIRONMENT.dev
    ? "alphacn.webcasts.com"
    : pexipDataJsonVar?.conferencing_node;
export const INITIAL_TOKEN =
  ENV === ENVIRONMENT.dev
    ? "qtYTlpViriyaGNjSzIg1b90KCWZ7Os5oPyWY8L3VNjHwNAlgnILfB0v9yzEOXshQMB-K_-P4HENdCyqscZOSzh7WjdcQ7n_nkJQ_UlxKdzMmfb55au7CTiBQIXMshpawUJpWr3G1p5hW2JUllT5vQtZ4jSj_LevX8lO46NU1IgzBUY2iL96MbEETz9FdV9wvlQfIJpAm_gtkw-CArTKJEaQzrUr444kgtfsnSsTED5lLTmplkCxf4-keOhE="
    : pexipDataJsonVar?.pexipClientToken;
export const INITIAL_PARTICIPANT =
  ENV === ENVIRONMENT.dev ? INITIAL_PARTICIPANTS_DUMMY : SAVED_PARTICIPANTS;
export const VB_URI_NAME =
  ENV === ENVIRONMENT.dev
    ? "Richard Felix"
    : decodeURIComponent(pexipDataJsonVar?.fullNameVb);
export const MAX_PARTICIPANTS =
  ENV === ENVIRONMENT.dev ? 20 : pexipDataJsonVar?.sMaxRoomParticipants;
export const TALKING_PERSON_UUID =
  ENV === ENVIRONMENT.dev ? "" : pexipDataJsonVar?.talkingVbPersonUuid;
export const SHOW_VB_MSG = (msg) => {
  ENV === ENVIRONMENT.dev
    ? console.log(msg)
    : pexipDataJsonVar?.showMyOwnVbMsg(msg);
};
export const WAIT_TO_JOIN_ORDER = pexipDataJsonVar?.waitToJoinOrder
  ? pexipDataJsonVar?.waitToJoinOrder
  : [];
export const PRESENTER_ORDER = pexipDataJsonVar?.presentersOrder
  ? pexipDataJsonVar?.presentersOrder
  : [];
export const STREAMS_ORDER = pexipDataJsonVar?.streamsOrder
  ? pexipDataJsonVar?.streamsOrder
  : [];

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
  orderedList: "orderedList",
  audioMuteMsg: "audioMuteMsg",
  videoMuteMsg: "videoMuteMsg",
  videoUnmuteMsg: "videoUnmuteMsg",
  sendMsg: "sendMsg",
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
  upperCaseHost: "Host",
  upperCaseGuest: "Guest",
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
  allowShares: "Enable Receive Shares",
  denyShares: "Disable Receive Shares",
  openDtmf: "Open DTMP Keypad",
  editProfile: "Edit Presenter Profile",
  submitNewOverlayName: "Submit New Overlay Name",
  admit: "Admit",
  deny: "Deny",
  openActionMenu: "Open Action Menu",
  cancel: "Cancel",
  screenShare: "Screensharing",
  switchOff: "Switch Off",
  switchOn: "Switch On",
};

export const BUTTON_NAMES = {
  video: "video",
  audio: "audio",
  spolight: "spolight",
  admit: "admit",
  deny: "deny",
  openDTMFKeypad: "Open DTMF Keypad",
  editPresenterProfile: "Edit Presenter Profile",
  editStreamProfile: "Edit Stream Profile",
  makeHost: "Make Host",
  makeguest: "Make Guest",
  editProfile: "Edit Presenter Profile",
  update: "Update",
  remove: "Remove",
  cancel: "Cancel",
  removePresenter: "Remove Presenter",
  removeStream: "Remove Stream",
};

export const LABEL_NAMES = {
  profileEditName: "Name",
  id: "ID",
  role: "Role",
  joined: "Joined",
  protocol: "Protocol",
  removeDialog1: "Are you sure you want to remove",
  removeDialog2: "from this meeting?",
  editProfileErrorMsgNameTxt: "Name can not be blank.",
  unknown: "Unknown",
  removeDialogErrorMsg1: "Please try again to remove",
  removeDialogErrorMsg2: "from this meeting.",
  contentshareEnabled: "is now receiving content shares",
  contentshareDisabled: "is no longer receiving content shares",
  errorContentshareEnabled1: "Failed to enable content share for",
  errorContentshareEnabled2: "Please try again.",
  errorContentshareDisabled1: "Failed to disabled content share for",
  errorContentshareDisabled2: "Please try again.",
  unMutedAudioBtnPressMsg: "A Host has requested you unmute your Microphone.",
  unMutedBtnVideoPressMsg: "A Host has requested you turn your Camera on.",
  muteBtnVideoPressMsg: "A Host has turned your Video off.",
  applyChangesFailed: "Your applied changes have failed.  Please try again.",
};

export const PROTOCOLS = {
  rtmp: "rtmp",
  api: "api",
  webrtc: "webrtc",
  h323: "h323",
  teams: "teams",
  mssip: "mssip",
  sip: "sip",
  isStreaming: "isStreaming",
  blank: "",
};

export const HEADERS = {
  dtmfHeader: "DTMF Keypad",
  presenters: "Presenters",
  presenterProfile: "Presenter Profile",
  waitingToJoin: "Waiting to Join",
  streams: "Streams",
  streamProfile: "Stream Profile",
};

export const SERVICE_TYPE = {
  connecting: "connecting",
  waiting_room: "waiting_room",
  ivr: "ivr",
  conference: "conference",
  lecture: "lecture",
  gateway: "gateway",
  test_call: "test_call",
};

export const CALL_TYPE = {
  video: "video",
  api: "api",
};

export const WAITING_TO_JOIN_LIST_SERVICE_TYPE = [SERVICE_TYPE.waiting_room];

export const PARTICIPANTS_LIST_PROTOCOLS = [
  PROTOCOLS.webrtc,
  PROTOCOLS.blank,
  PROTOCOLS.h323,
  PROTOCOLS.teams,
  PROTOCOLS.mssip,
  PROTOCOLS.sip,
];

export const STREAM_LIST_PROTOCOLS = [PROTOCOLS.rtmp];
