import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Divider } from "semantic-ui-react";

class Header extends Component {
  onLogout = () => {
    alert('Logout');
  }

  render() {
    return (
      <div>
        <Divider />
        <div className="ui borderless huge menu">
          <div className="header item">M</div>
          <NavLink to="/" exact className="item">
            Home
          </NavLink>
          <NavLink to="/summary/report" exact className="item">
            Report
          </NavLink>
          <NavLink to="#" className="ui right floated item" onClick={this.onLogout}>
            Logout
          </NavLink>
        </div>
      </div>
    );
  }
}

export default Header;
