import React from "react";
import { WindowsLinks, AndroidLinks, OsLinks } from "./softwares";
import { Movies } from "./media";
import { About } from "./others";
import IPLocator from "../api/ipLocator";
import Youtube from "../api/youtube";
export const AuthContent = props => {
  return (
    <div>
      {props.windows
        ? ((document.title = "Windows | JamgPH"), <WindowsLinks />)
        : props.android
        ? ((document.title = "Android | JamgPH"), <AndroidLinks />)
        : props.os
        ? ((document.title = "Operating System | JamgPH"), <OsLinks />)
        : props.movies
        ? ((document.title = "Movies | JamgPH"), <Movies />)
        : props.ip
        ? ((document.title = "IP Locator | JamgPH"), <IPLocator />)
        : props.yt
        ? ((document.title = "Youtube to mp3 | JamgPH"), <Youtube />)
        : props.about
        ? ((document.title = "About | JamgPH"), <About />)
        : props.default
        ? ((document.title = "Home | JamgPH"), props.defaultContent)
        : "error"}
    </div>
  );
};
export const NonAuthContent = props => {
  return (
    <div>
      <div className="mb-4">
        <div>Verify this email to continue - {props.email}</div>
      </div>
      {!props.sendEmailButton ? (
        <div hidden="true">
          <button
            className="btn btn-sm btn-info"
            onClick={props.sendVerification}
            disabled={props.btnDisabled}
          >
            Send Email Verification
          </button>
        </div>
      ) : (
        <button className="btn btn-sm btn-success" disabled={props.btnDisabled}>
          Verification Sent!
        </button>
      )}
    </div>
  );
};
