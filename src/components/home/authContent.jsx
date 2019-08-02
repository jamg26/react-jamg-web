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
        ? ((document.title = "Windows | jamg.ml"), <WindowsLinks />)
        : props.android
        ? ((document.title = "Android | jamg.ml"), <AndroidLinks />)
        : props.os
        ? ((document.title = "Operating System | jamg.ml"), <OsLinks />)
        : props.movies
        ? ((document.title = "Movies | jamg.ml"), <Movies />)
        : props.ip
        ? ((document.title = "IP Locator | jamg.ml"), <IPLocator />)
        : props.yt
        ? ((document.title = "Youtube to mp3 | jamg.ml"), <Youtube />)
        : props.about
        ? ((document.title = "About | jamg.ml"), <About />)
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
