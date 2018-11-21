import React from "react";
import Modal from "react-modal";

export const MyModal = props => {
  const customStyles = {
    content: {
      top: "30%",
      left: "50%",
      right: "auto",
      width: "300px",
      bottom: "auto",
      paddingRight: "20px",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)"
    }
  };
  return (
    <div>
      <Modal
        isOpen={props.isOpen}
        onAfterOpen={props.onAfterOpen}
        onRequestClose={props.onRequestClose}
        shouldCloseOnOverlayClick={false}
        style={customStyles}
        ariaHideApp={false}
        contentLabel={props.contentLabel}
      >
        <h3 className="mb-4 abel" ref={props.subtitle}>
          {props.content}
        </h3>
        <button
          onClick={props.onClick}
          className={props.buttonClass}
          disabled={props.disabled}
        >
          {props.buttonName}
        </button>
      </Modal>
    </div>
  );
};

export const MyModalForgotPw = props => {
  const customStyles = {
    content: {
      top: "30%",
      left: "50%",
      right: "auto",
      width: "300px",
      bottom: "auto",
      paddingRight: "20px",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)"
    }
  };
  return (
    <div>
      <Modal
        isOpen={props.isOpen}
        onAfterOpen={props.onAfterOpen}
        closeTimeoutMS={5000}
        onRequestClose={props.onRequestClose}
        shouldCloseOnOverlayClick={false}
        style={customStyles}
        ariaHideApp={false}
        contentLabel={props.contentLabel}
      >
        <h3 className="mb-4 abel" ref={props.subtitle}>
          {props.content}
        </h3>
        <form onSubmit={props.onSubmit}>
          <input
            className="form-control mb-4 mr-3"
            type="password"
            onChange={props.onChange}
            id="newPassword"
            autoComplete="password"
            placeholder="New Password"
            required
          />
          <button className="btn btn-danger" disabled={props.disabled}>
            Submit
          </button>
        </form>
      </Modal>
    </div>
  );
};
