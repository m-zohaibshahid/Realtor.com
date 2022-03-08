import { baseUrl } from "../config/baseUrl";
export const sendEmail = async (body) => {
  return await fetch(`${baseUrl}/forgotPassword`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
