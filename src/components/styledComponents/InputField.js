import React from "react";
import "./InputField.css";

const InputField = props => {
  return (
    <div className="input-field-wrapper">
      <input
        {...props}
        className="custom-input-field"
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
};

export default InputField;
