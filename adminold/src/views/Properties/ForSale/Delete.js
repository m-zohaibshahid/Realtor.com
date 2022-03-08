import SplashScreen from "components/SplashScreen";
import { baseUrl } from "config/baseUrl";
import React, { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const Delete = (props) => {
  const { setDeleteModal, reloadData, id } = props;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    confirmAlert({
      title: "Confirm to Delete",
      message: "Are you sure to delete this permanently?.",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteItem(id),
        },
        {
          label: "No",
          onClick: () => "",
        },
      ],
    });
  }, []);
  const deleteItem = async (id) => {
    setLoading(true);
    const token = localStorage.getItem("auth-token");
    await fetch(`${baseUrl}/removeSaleProperty/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setDeleteModal(false);
        reloadData();
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  if (loading) {
    <SplashScreen />;
  }
  return <p></p>;
};

export default Delete;
