import React from "react";
import Linkify from "react-linkify";
export const Messages = props => {
  return (
    <div>
      {!props.avatar ? (
        props.user + ":"
      ) : (
        <img
          className="sender rounded-circle"
          src={props.avatar}
          alt={props.user}
          title={props.user}
        />
      )}
      <span className="ml-2">
        <Linkify properties={{ target: "_blank" }}>{props.message}</Linkify>
      </span>
      <br />
      <small>{props.date}</small>
      <hr />
    </div>
  );
};

export const Pinned = props => {
  return (
    <div>
      <span className="text-danger">{props.name + ":"}</span>
      <span className="ml-2">
        <Linkify properties={{ target: "_blank" }}>{props.message}</Linkify>
      </span>
      <br />
      <small>Will be deleted {props.date}</small>
      <hr />
    </div>
  );
};
