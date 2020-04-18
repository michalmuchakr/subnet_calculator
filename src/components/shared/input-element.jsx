import React from "react";

const InputElement = ({ label, name, readOnly, value }) => (
  <label className="form__label" htmlFor={name}>
    <span className="form__descript">{label}</span>
    <input
      className="form__input"
      type="text"
      id={name}
      name={name}
      readOnly={readOnly}
      defaultValue={value}
    />
  </label>
);

export default InputElement;
