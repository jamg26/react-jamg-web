import React from "react";
export const MobileHandler = props => {
  return (
    <h5 id="dashboard">
      <div className="d-none d-block d-md-none text-center content-handler">
        <i
          className={
            props.homeClass
              ? "fas fa-home fa-lg text-danger"
              : "fas fa-home fa-lg"
          }
          onClick={props.home}
        />
        <i
          className={
            props.windowClass
              ? "fab fa-windows fa-lg m-1 text-primary"
              : "fab fa-windows fa-lg m-1"
          }
          onClick={props.windows}
        />
        <i
          className={
            props.androidClass
              ? "fab fa-android fa-lg m-1 text-success"
              : "fab fa-android fa-lg m-1"
          }
          onClick={props.android}
        />
        <i
          className={
            props.osClass
              ? "fab fa-linux fa-lg m-1 text-info"
              : "fab fa-linux fa-lg m-1"
          }
          onClick={props.os}
        />
        <i
          className={
            props.movieClass
              ? "fas fa-film fa-lg m-1 text-danger"
              : "fas fa-film fa-lg m-1"
          }
          onClick={props.movies}
        />
        <i
          className={
            props.ipClass
              ? "fas fa-map-marked-alt fa-lg m-1 text-warning"
              : "fas fa-map-marked-alt fa-lg m-1"
          }
          onClick={props.iplocator}
        />
        <i
          className={
            props.ytClass
              ? "fab fa-youtube fa-lg m-1 text-danger"
              : "fab fa-youtube fa-lg m-1"
          }
          onClick={props.youtube}
        />
        <i
          className={
            props.aboutClass
              ? "fas fa-users fa-lg text-info"
              : "fas fa-users fa-lg"
          }
          onClick={props.about}
        />
      </div>
    </h5>
  );
};
