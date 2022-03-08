import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logoutMe } from "../../../reducers/authReducer";

const Logout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logoutMe());
  }, []);
  return <div>Logout...</div>;
};

export default Logout;
