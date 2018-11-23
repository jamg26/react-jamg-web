import React from "react";
import ReactHtmlParser from "react-html-parser";
import Linkify from "react-linkify";

export const NormalPost = props => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <h5 className="card-titles text-dark m-3">
              {props.title}
              <br />
            </h5>
            <div className="card-body">
              <div className="container">
                <div className="row">
                  <div className="col-md-2 text-center">
                    <img
                      className="forum-avatar rounded-circle"
                      src={props.avatar}
                      alt={props.author}
                      title={props.author}
                    />
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export const PinnedPost = props => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <h5 className="card-titles text-dark m-3">
              {props.title}
              <br />
            </h5>
            <div className="card-body">
              <div className="container">
                <div className="row">
                  <div className="col-md-2 text-center">
                    <img
                      className="forum-avatar rounded-circle"
                      src={props.avatar}
                      alt={props.author}
                      title={props.author}
                    />
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
