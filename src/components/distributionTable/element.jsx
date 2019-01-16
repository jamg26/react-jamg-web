import React from "react";

export const Element = props => {
  return (
    <tr>
      <th scope="row">{props.count}</th>
      <th scope="row">
        <input
          id="classInterval"
          type="text"
          className="form-control"
          onChange={props.interval}
          datakey={props.count}
        />
      </th>
      <th scope="row">
        <input
          id="classFrequency"
          type="text"
          className="form-control"
          onChange={props.freq}
          datakey={props.count}
        />
      </th>
      <th scope="row">
        <input
          id="classMark"
          type="text"
          className="form-control"
          value={props.classMark}
        />
      </th>
      <th scope="row">
        <input id="fx" type="text" className="form-control" value={props.fx} />
      </th>
      <th scope="row">
        <input id="cf" type="text" className="form-control" value={props.cf} />
      </th>
    </tr>
  );
};
