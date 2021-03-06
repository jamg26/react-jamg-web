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
        ? ((document.title = "Windows"), <WindowsLinks />)
        : props.android
        ? ((document.title = "Android"), <AndroidLinks />)
        : props.os
        ? ((document.title = "Operating System"), <OsLinks />)
        : props.movies
        ? ((document.title = "Movies"), <Movies />)
        : props.ip
        ? ((document.title = "IP Locator"), <IPLocator />)
        : props.yt
        ? ((document.title = "Youtube to mp3"), <Youtube />)
        : props.about
        ? ((document.title = "About"), <About />)
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
