import React from "react";
import "./ToolTip.css";

const ToolTip = props => {
  return <div className="tooltip">{props.text}</div>;
};

export default ToolTip;
