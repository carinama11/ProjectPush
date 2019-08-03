import React from "react";
import "./scss/style.css";
import Weapons from "./Fortnite-API/weapons";
import "font-awesome/css/font-awesome.min.css";
import Shops from "./Fortnite-API/shop";
import Home from "./Fortnite-API/home";
import Navbar from "./Fortnite-API/navbar";
import MobileMenu from "./Fortnite-API/mobileMenu";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/weapons" exact component={Weapons} />
          <Route path="/shops" exact component={Shops} />
          <Route path="/test" exact component={MobileMenu} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
