import React from "react";

export const ContentHandler = props => {
  return (
    <div>
      <li>
        <span className="btn badge" onClick={props.click}>
          <i className={props.className} /> {props.name}
        </span>
      </li>
    </div>
  );
};
