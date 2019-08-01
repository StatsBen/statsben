import React from "react";

const formBuilder = {
  /** attr needs to be a valid object with the correct fields defined in
	    the entries definition (probably in the globals directory...)  */
  makeInputElement(defn, value, changeHandler) {
    let firstChar = defn.name.charAt(0).toUpperCase();
    let theRest = defn.name.slice(1).toLowerCase();
    let label = firstChar + theRest;

    let input = null;

    if (defn.type == "string") {
      input = (
        <input
          name={`input-${defn.name}`}
          type={"text"}
          value={value}
          onChange={changeHandler}
        />
      );
    } else if (defn.type == "boolean") {
      input = (
        <input
          name={`input-${defn.name}`}
          type={"checkbox"}
          checked={value}
          onChange={changeHandler}
        />
      );
    } else {
      console.error(
        "Can't automatically make a form input for an attribute of type " +
          defn.type +
          " with makeInputElement()"
      );
      throw new Error("Invalid Entry Attribute for makeInputElement");
    }

    return (
      <div key={`input-for-${defn.name}`}>
        <label htmlFor={`input-${defn.name}`}>{label}</label>
        {input}
      </div>
    );
  }
};

export { formBuilder };
