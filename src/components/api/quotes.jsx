import React, { Component } from "react";
import { Loading } from "../../functions/loaders";
class Quotes extends Component {
  state = {
    fetch: ""
  };
  fetchQuote() {
    const url = "https://talaikis.com/api/quotes/random/";
    fetch(url)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            fetch: result
          });
        },
        error => {}
      );
  }
  componentWillMount() {
    this.fetchQuote();
  }
  render() {
    const { fetch } = this.state;
    return (
      <div>
        {!fetch.quote ? (
          <Loading />
        ) : (
          <blockquote className="blockquote">
            <p className="mb-3">{fetch.quote}</p>
            <footer className="blockquote-footer">{fetch.author}</footer>
          </blockquote>
        )}
      </div>
    );
  }
}
export default Quotes;
