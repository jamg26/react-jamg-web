import React, { Component } from "react";
class IPLocator extends Component {
  state = {
    base_url: "https://extreme-ip-lookup.com/json/",
    ip: "",
    items: "",
    isLoaded: ""
  };

  onChangeHandler = e => {
    this.setState({
      [e.target.id]: this.state.base_url + e.target.value
    });
  };

  requestInfo = e => {
    e.preventDefault();
    fetch(this.state.ip)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  };
  render() {
    const { items } = this.state;
    return (
      <div>
        <div className="row">
          <div className="col-12">
            <form className="white" onSubmit={this.requestInfo}>
              <h3 className="mb-4">Find IPv4 Address</h3>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <div className="input-group-text text-danger">IP</div>
                </div>
                <input
                  className="validate form-control"
                  type="text"
                  onChange={this.onChangeHandler}
                  id="ip"
                  required
                />
              </div>
              <button className="btn btn-primary">Submit</button>
            </form>
          </div>
          <div className="col-12">
            <ul className="list-unstyled">
              {items.query ? (
                <div>
                  <br />
                  <li>
                    IPv4: <b>{items.query}</b>
                  </li>
                  <li>
                    ISP: <b>{items.isp}</b>
                  </li>
                  <li>
                    Organization: <b>{items.org}</b>
                  </li>
                  <li>
                    IP Type: <b>{items.ipType}</b>
                  </li>
                  <li>
                    Country: <b>{items.country}</b>
                  </li>
                  <li>
                    Continent: <b>{items.continent}</b>
                  </li>
                  <li>
                    Latitude: <b>{items.lat}</b>
                  </li>
                  <li>
                    Longitude: <b>{items.lon}</b>
                  </li>
                </div>
              ) : null}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
export default IPLocator;
