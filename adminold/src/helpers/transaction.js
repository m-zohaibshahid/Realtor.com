import { baseUrl } from "config/baseUrl";
export const getTransactions = async () => {
  return await fetch(`${baseUrl}/api/admin/transactions`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("auth-token")}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
