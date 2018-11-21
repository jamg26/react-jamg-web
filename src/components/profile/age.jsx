import React from "react";
import { Link } from "react-router-dom";
export const Age = props => {
  return (
    <div>
      {props.Age ? (
        <div>
          <span hidden={!props.ageInput}>Age: {props.Age}</span>
          <Link to="#" onClick={props.addAgeInput} hidden={!props.ageInput}>
            {" "}
            <i className="fas fa-pencil-alt fa-sm text-dark" />
          </Link>
        </div>
      ) : (
        <Link to="#" onClick={props.addAgeInput} hidden={!props.ageInput}>
          Add age
        </Link>
      )}
      <form onSubmit={props.submitAge}>
        <input
          type="number"
          hidden={props.ageInput}
          placeholder={props.Age}
          onChange={props.ageChange}
          className="form-control form-control-sm col-3"
        />{" "}
      </form>
    </div>
  );
};
