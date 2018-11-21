import React from "react";
export const Dp = props => {
  return (
    <div>
      {props.photoURL ? (
        <div hidden={props.hidden}>
          <img
            className="dp rounded-circle"
            src={props.photoURL}
            onLoad={props.onLoad}
            alt="DefaultPicture"
            title="Click to upload"
            onClick={props.openFile}
          />
          <i
            className="fas fa-times text-danger fa-lg rm d-none"
            title="Remove Picture"
            onClick={props.removeDp}
          />
        </div>
      ) : (
        <div>
          <img
            className="dp rounded-circle"
            src={props.avatar}
            alt="NoAvatar"
            title="Click to upload"
            onClick={props.openFile}
          />
        </div>
      )}
    </div>
  );
};
