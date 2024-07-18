import { EVENT_ID, NODE_ADDRESS, INITIAL_TOKEN } from "../config/constants";

export const participantsPostFetch = async (data) => {
  await fetch(
    `https://${NODE_ADDRESS}/api/client/v2/conferences/${EVENT_ID}/participants/${data.uuid}/${data.call}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: `${data.token}`,
      },
    }
  );
};

export const participantsPostWithBody = async (data) => {
  await fetch(
    `https://${NODE_ADDRESS}/api/client/v2/conferences/${EVENT_ID}/participants/${data.uuid}/${data.call}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: `${data.token}`,
      },
      body: JSON.stringify(data.body),
    }
  );
};

export const conferencePostFetch = async (data) => {
  await fetch(
    `https://${NODE_ADDRESS}/api/client/v2/conferences/${EVENT_ID}/${data.call}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: `${data.token}`,
      },
    }
  );
};

export const conferenceGetFetch = async (data) => {
  await fetch(
    `https://${NODE_ADDRESS}/api/client/v2/conferences/${EVENT_ID}/${data.call}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: `${data.token}`,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => data.result)
    .catch((err) => {
      console.log(err);
    });
};
/* ============================     Control-Room-Api      =============================== */

export const transformLayout = async (data) => {
  console.log("Selected Layout and new token: ", data, INITIAL_TOKEN );
  const response = await fetch(`https://${NODE_ADDRESS}/api/client/v2/conferences/${EVENT_ID}/transform_layout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: `${INITIAL_TOKEN}`,
    },
    body: JSON.stringify(data.body),
  });
  return response;
};

export const fetchParticipants = async () => {
  const response = await fetch(`https://${NODE_ADDRESS}/api/client/v2/conferences/${EVENT_ID}/participants`, {
    headers: {
      token: `${INITIAL_TOKEN}`,
    },
  });
  const data = await response.json();
  return data.result;
};

export const participantSpotlightOn = async (data) => {
  console.log("called participantSpotlightOn api ", data, INITIAL_TOKEN);
  await fetch(
    `https://${NODE_ADDRESS}/api/client/v2/conferences/${EVENT_ID}/participants/${data.uuid}/spotlighton`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: `${INITIAL_TOKEN}`,
      },
      body: JSON.stringify(data.body),
    }
  );
};

export const participantSpotlightOff = async (data) => {
  console.log("called participantSpotlightOff api ", data, INITIAL_TOKEN);
  await fetch(
    `https://${NODE_ADDRESS}/api/client/v2/conferences/${EVENT_ID}/participants/${data.uuid}/spotlightoff`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: `${INITIAL_TOKEN}`,
      },
      body: JSON.stringify(data.body),
    }
  );
};