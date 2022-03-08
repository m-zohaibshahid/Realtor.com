export const fetch2 = async (api, body, type) => {
  const res = await fetch(api, {
    method: type,
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify(body),
  });
  return await res.json();
};

export const fetch3 = async (api, type) => {
  const res = await fetch(api, {
    method: type,
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("auth-token"),
    },
  });
  return await res.json();
};
export const fetch5 = async (api, type) => {
  const res = await fetch(api, {
    method: type,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await res.json();
};

export const fetch4 = async (api, body, type) => {
  const res = await fetch(api, {
    method: type,
    headers: {
      "Content-Type": "'multipart/form-data",
      Authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify(body),
  });
  return await res.json();
};
