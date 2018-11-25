import React from "react";
import ReactHtmlParser from "react-html-parser";
import Linkify from "react-linkify";
export const NormalPost = props => {
  return (
    <div className="row">
      <div className="col-md-2 text-center">
        {!props.avatar ? null : (
          <img
            className="forum-avatar rounded-circle"
            src={props.avatar}
            alt={props.author}
            title={props.author}
          />
        )}
        <br />
        <h3>{props.author}</h3>
      </div>
      <div className="col-md-6">
        <div className="card">
          <div className="card-body">
            <Linkify properties={{ target: "_blank" }}>
              {ReactHtmlParser(props.message)}
            </Linkify>
          </div>
        </div>
      </div>
    </div>
  );
};
export const PinnedPost = props => {
  return (
    <div className="row">
      <div className="col-md-2 text-center">
        {!props.avatar ? null : (
          <img
            className="forum-avatar rounded-circle"
            src={props.avatar}
            alt={props.author}
            title={props.author}
          />
        )}
        <br />
        <h3>{props.author}</h3>
      </div>
      <div className="col-md-6">
        <div className="card">
          <div className="card-body forum-body">
            <Linkify properties={{ target: "_blank" }}>
              {ReactHtmlParser(props.message)}
            </Linkify>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Replies = props => {
  return (
    <div>
      <div className="row">
        <div className="col-md-2 text-center">
          {!props.avatar ? (
            props.author
          ) : (
            <img
              className="forum-avatar-reply rounded-circle"
              src={props.avatar}
              alt={props.author}
              title={props.author}
            />
          )}
          <br />
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body forum-body">
              <Linkify properties={{ target: "_blank" }}>
                {ReactHtmlParser(props.message)}
              </Linkify>
            </div>
          </div>
        </div>
      </div>
      <small className="float-right text-muted">{props.date}</small>
      <br />
      <hr />
    </div>
  );
};
