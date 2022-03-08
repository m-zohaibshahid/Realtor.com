import axios from "axios";
import { baseUrl } from "../config/baseUrl";

export const PropertyAPI = async (body) => {
  let res;
  console.log("body in property helpers", body.type);
  console.log("body in property helpers", body.formData);
  let headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("auth-token"),
  };
  if (type === "POST") {
    console.log("this is POST method");
    res = await axios.post(`${baseUrl}/createProperty`, body, {
      headers,
    });
  } else if (type === "PUT") {
    console.log("this is PUT method");
    res = await axios.put(`${baseUrl}/updateProperty/${body?._id}`, body, {
      headers,
    });
  }
  return await res.json();
};
