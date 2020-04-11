import React from "react";
import "styles/nav.scss";

import { useAppStateContext } from "app-context.jsx";

function Nav() {
  const { userAuthenticated } = useAppStateContext();
  return (
    <nav className="nav">
      <div className="nav__container">
        <ul className="nav__list">
          <li className="nav__list-item">Subnet calculator</li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
