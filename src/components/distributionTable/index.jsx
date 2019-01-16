import React, { Component } from "react";
import { Element } from "./element";

class DistributionTable extends Component {
  componentDidMount() {
    document.title = "Frequency Distribution Table | JamgPH";
  }
  state = {
    countInterval: 0,
    range: {},
    classMark: {},
    fx: {},
    cf: {},
    min: 0,
    max: 0
  };
  ranges = [];
  classMark = [];
  fx = [];
  cf = [];
  countInterval = e => {
    this.setState({
      countInterval: e.target.value
    });
  };
  frequency = e => {
    const k = e.target.getAttribute("datakey");
    this.fx[k - 1] = e.target.value * this.classMark[k - 1];
    this.cf[k - 1] = this.cf[k - 2]
      ? parseFloat(this.cf[k - 2]) + parseFloat(e.target.value)
      : parseFloat(e.target.value);
    this.setState({
      fx: this.fx,
      cf: this.cf
    });
  };
  interval = e => {
    const k = e.target.getAttribute("datakey");
    let classMark = e.target.value.split("-");
    const classMarks =
      (parseFloat(classMark[0]) + parseFloat(classMark[1])) / 2;
    this.classMark[k - 1] = classMarks;
    this.ranges[k - 1] = e.target.value;
    this.setState({
      range: this.ranges,
      classMark: this.classMark
    });
  };
  cMin = e => {
    this.setState({
      min: e.target.value
    });
  };
  cMax = e => {
    this.setState({
      max: e.target.value
    });
  };
  render() {
    const classSize =
      (this.state.max - this.state.min) / this.state.countInterval;
    let table = [];
    for (let x = 1; x <= this.state.countInterval; x++) {
      table.push(
        <Element
          key={x}
          count={x}
          interval={this.interval}
          classMark={this.state.classMark[x - 1]}
          freq={this.frequency}
          fx={this.state.fx[x - 1]}
          cf={this.state.cf[x - 1]}
        />
      );
    }
    return (
      <div>
        <h5>Number of intervals</h5>
        <input
          id="countInterval"
          type="number"
          onChange={this.countInterval}
          className="form-control col-2 mb-3"
        />
        <table className="table">
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Class Interval</th>
              <th scope="col">f</th>
              <th scope="col">x</th>
              <th scope="col">fx</th>
              <th scope="col">&#60; cf</th>
            </tr>
          </thead>
          <tbody>{table}</tbody>
        </table>
        {this.state.countInterval ? (
          <div>
            <h2>Class Size: </h2>
            <div className="row">
              <div className="col-md-2">
                <input
                  id="min"
                  type="number"
                  className="form-control"
                  placeholder="Min"
                  onChange={this.cMin}
                />
              </div>
              <div className="col-md-2">
                <input
                  id="max"
                  type="number"
                  className="form-control"
                  placeholder="Max"
                  onChange={this.cMax}
                />
              </div>
              <div className="col-md-2">
                <h3>
                  ={" "}
                  {(classSize > 0) | (classSize < 100000)
                    ? Math.round(classSize)
                    : null}
                </h3>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
export default DistributionTable;
