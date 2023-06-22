import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { MenuPoint } from "../../App";

type Props = {
  menuPoints: MenuPoint[]
}

const Navigator: React.FC<Props> = ({ menuPoints }) => {
  return (
    <div>
      <nav>
        <ul className="navigator-list">
          {menuPoints.map((elem, index) => <li key={index} className="navigator-item">
            <NavLink className="navigator-item__link" to={elem.path}>{elem.title}</NavLink>
          </li>)}
        </ul>
      </nav>
      <Outlet></Outlet>
    </div>
  );
};

export default Navigator;
