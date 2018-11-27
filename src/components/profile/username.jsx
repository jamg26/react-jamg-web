import React from "react";
import { Link } from "react-router-dom";
export const Username = props => {
  return (
    <div>
      {props.username ? (
        <div>
          <span hidden={!props.usernameInput}>Username: {props.username}</span>
          <Link
            to="#"
            onClick={props.addUsernameInput}
            hidden={!props.usernameInput}
          >
            {" "}
            <i className="fas fa-pencil-alt fa-sm text-dark" />
          </Link>
        </div>
      ) : (
        <Link
          to="#"
          onClick={props.addUsernameInput}
          hidden={!props.usernameInput}
        >
          Edit
        </Link>
      )}
      <form onSubmit={props.submitUsername}>
        <input
          type="text"
          hidden={props.usernameInput}
          placeholder={props.username}
          onChange={props.usernameChange}
          className="form-control form-control-sm col-3"
        />{" "}
      </form>
    </div>
  );
};
