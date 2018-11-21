import React, { Component } from "react";

class Youtube extends Component {
  state = {
    id: ""
  };
  onChangeHandler = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  render() {
    const { id } = this.state;
    return (
      <div>
        <h3 className="mb-4">Enter youtube link address</h3>
        <input
          className="validate form-control mb-3"
          type="text"
          onChange={this.onChangeHandler}
          id="id"
          placeholder="https://www.youtube.com/watch?v=DFWrI6wIjC8"
          required
        />
        <div>
          <ul className="list-unstyled">
            {id ? (
              <li>
                <iframe
                  src={"//www.recordmp3.co/#/watch?v=" + id + "&layout=button"}
                  title="url"
                  style={{ width: 300, height: 40, border: 0 }}
                />
                <noscript>
                  <a href={"https://www.recordmp3.co/#/watch?v=" + id}>
                    Youtube to MP3
                  </a>
                </noscript>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    );
  }
}
export default Youtube;
