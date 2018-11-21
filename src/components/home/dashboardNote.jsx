import React from "react";
import { Link } from "react-router-dom";
export const DashNote = props => {
  return (
    <div className="dash-note">
      Hello {props.firstName} I'm happy to see you here, unfortunately this
      website is under construction. There are some contents available on the
      navigation menu. <br />
      <ul>
        <li>
          Softwares
          <ul>
            <li>
              Windows, Android and Operating Systems I did not intend to pirate
              those copies, I just want it for testing purposes.
            </li>
          </ul>
        </li>
        <li>
          Movies
          <ul>
            <li>I also did not intend to pirate those copies.</li>
          </ul>
        </li>
        <li>
          You can download any content but we are not liable for any damages due
          to file mishandling.
        </li>
        <li>
          Other API's
          <ul>
            <li>
              You can use tools such as Youtube to mp3, IP locator and other
              cool stuff available later.
            </li>
          </ul>
        </li>
      </ul>
      If you have other concern you can reach me{" "}
      <Link to="" onClick={props.about}>
        here.
      </Link>
    </div>
  );
};
