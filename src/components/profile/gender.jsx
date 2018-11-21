import React from "react";
import { Link } from "react-router-dom";
export const Gender = props => {
  return (
    <div>
      {props.Gender ? (
        <div>
          <span hidden={!props.genderInput}>Gender: {props.Gender}</span>
          <Link
            to="#"
            onClick={props.addGenderInput}
            hidden={!props.genderInput}
          >
            {" "}
            <i className="fas fa-pencil-alt fa-sm text-dark" />
          </Link>
        </div>
      ) : (
        <Link to="#" onClick={props.addGenderInput} hidden={!props.genderInput}>
          Add Gender
        </Link>
      )}
      <select
        className="form-control form-control-sm col-5"
        onChange={props.submitGender}
        hidden={props.genderInput}
      >
        <option value="">Select</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="LGBT">LGBT</option>
        <option value="Prefer not to say">Prefer not to say</option>
      </select>
    </div>
  );
};
