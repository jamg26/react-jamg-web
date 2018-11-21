import React from "react";

export const GroupTextHandler = props => {
  return (
    <div className="input-group-prepend">
      <div className="input-group-text bg-light">
        <i className={props.className} />
      </div>
    </div>
  );
};
