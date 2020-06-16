import React from "react";
import "./Button.css";

const Button = props => {
  return (
    <React.Fragment>
      <button className="primary-button" {...props} />
    </React.Fragment>
  );
};

export default Button;
