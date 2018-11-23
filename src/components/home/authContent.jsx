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
        ? ((document.title = "Windows | jamgph"), <WindowsLinks />)
        : props.android
        ? ((document.title = "Android | jamgph"), <AndroidLinks />)
        : props.os
        ? ((document.title = "Operating System | jamgph"), <OsLinks />)
        : props.movies
        ? ((document.title = "Movies | jamgph"), <Movies />)
        : props.ip
        ? ((document.title = "IP Locator | jamgph"), <IPLocator />)
        : props.yt
        ? ((document.title = "Youtube to mp3 | jamgph"), <Youtube />)
        : props.about
        ? ((document.title = "About | jamgph"), <About />)
        : null}
    </div>
  );
};

export const NonAuthContent = props => {
  return (
    <div>
      <div className="mb-4">
        <ul className="list-unstyled">
          <li>Verify this email to continue - {props.email}</li>
          <li>Proceed to profile page to resend verification.</li>
        </ul>
      </div>
    </div>
  );
};
