import React from "react";
import "./ToastMessage.css";

const ToastMessage = props => {
  // console.log(props.showToast);
  return (
    <div className={`toast ${props.showToast ? "show" : "hide"} `}>
      {props.msg}
    </div>
  );
};

export default ToastMessage;
