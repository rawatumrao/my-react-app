import { EVENT_ID, NODE_ADDRESS } from "../contexts/constants";

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


// ==================================================
 // `https://${NODE_ADDRESS}/api/client/v2/conferences/${EVENT_ID}/participants/${data.uuid}/${data.call}`,

export const transformLayoutPostWithBody = async (data) => {
  await fetch(
    
    `https://${NODE_ADDRESS}/api/client/v2/conferences/${EVENT_ID}/transform_layout`,
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