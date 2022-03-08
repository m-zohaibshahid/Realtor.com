import React from "react";
import { Link } from "react-router-dom";

const LearnMoreBtn = ({ topMargin, buttonStyle }) => {
  return (
    <>
      <div className={`top-margin ${topMargin}`}>
        <Link to="/">
          <a href className={`${buttonStyle} w-button`}>
            Learn more
          </a>
        </Link>
      </div>
    </>
  );
};

export default LearnMoreBtn;
