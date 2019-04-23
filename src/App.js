import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./components/routes/Home";
import Movies from "./components/routes/Movies";
import Movie from "./components/routes/Movie";
import NotFound from "./components/routes/NotFound";
import Footer from "./components/routes/Footer";
import Actor from "./components/routes/Actor";
import { HashRouter, Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div style={{ position: "relative", minHeight: "100vh" }}>
          <div style={{ overflow: "auto", paddingBottom: "350px" }}>
            <NavBar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/Movie/:id" component={Movie} />
              <Route path="/movies/:input" component={Movies} />
              <Route path="/actor" component={Actor} />
              <Route component={NotFound} />
            </Switch>
            <Footer />
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;
