import React from "react";
import windows from "../../jsonLinks/windows.json";
import os from "../../jsonLinks/os.json";
import android from "../../jsonLinks/android.json";
import { ContentHandler } from "../../functions/contentHandler.jsx";
const link = type => {
  const links = type.map((data, index) => {
    return (
      <div key={data.name}>
        <a href={data.url}>{data.name}</a>
      </div>
    );
  });
  return links;
};

export const WindowsBtn = props => {
  return (
    <ContentHandler
      click={props.click}
      className="fab fa-windows fa-lg text-primary"
      name="Windows"
    />
  );
};
export const WindowsLinks = () => {
  return (
    <div>
      <h3>Windows Contents</h3>
      {link(windows)}
    </div>
  );
};

export const AndroidBtn = props => {
  return (
    <ContentHandler
      click={props.click}
      className="fab fa-android fa-lg text-success"
      name="Android"
    />
  );
};
export const AndroidLinks = () => {
  return (
    <div>
      <h3>Android Contents</h3>
      {link(android)}
    </div>
  );
};

export const OsBtn = props => {
  return (
    <ContentHandler
      click={props.click}
      className="fab fa-linux fa-lg text-info"
      name="Operating System"
    />
  );
};
export const OsLinks = () => {
  return (
    <div>
      <h3>OS Contents</h3>
      {link(os)}
    </div>
  );
};
