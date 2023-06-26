import React, { useEffect } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { MenuPoint } from "../../App";

type Props = {
  menuPoints: MenuPoint[]
}

const Navigator: React.FC<Props> = ({ menuPoints }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let index = menuPoints.findIndex((point) => "/" +  point.path === location.pathname)
    if (index === -1) {
      index = 0
    }
    navigate("/" + menuPoints[index].path)
  }, [menuPoints])
  
  return (
    <div className="application-container">
      <nav>
        <ul className="navigator-list">
          {menuPoints.map((elem, index) => <li key={index} className="navigator-item">
            <NavLink className="navigator-item__link" to={elem.path}>{elem.title}</NavLink>
          </li>)}
        </ul>
      </nav>
      <div className="content-container">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Navigator;
