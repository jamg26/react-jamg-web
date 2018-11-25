import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
export default function PinnedTopics({ topics }) {
  return (
    <div>
      {topics &&
        topics.map(p => {
          return (
            <li key={p.id}>
              <Link to={"/topic/" + p.id}>
                <ul className="list-unstyled shadow-sm p-2 mb-3 bg-white rounded">
                  <i className="fas fa-thumbtack" /> <b>{p.title}</b>
                  <small>
                    <li>
                      Posted by: {p.author} {moment(p.date.toDate()).calendar()}
                    </li>
                  </small>
                </ul>
              </Link>
            </li>
          );
        })}
    </div>
  );
}
