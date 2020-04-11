import React, { Component } from "react";

import Nav from "./components/shared/nav.jsx";
import Footer from "./components/shared/footer.jsx";
import Home from "./containers/home.jsx";

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Nav />
        <div className="container">
          <Home />
        </div>
        <Footer />
      </div>
    );
  }
}
