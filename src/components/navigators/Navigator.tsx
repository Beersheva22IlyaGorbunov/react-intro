import { AppBar, Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { MenuPoint } from "../../App";

type Props = {
  menuPoints: MenuPoint[];
};

const Navigator: React.FC<Props> = ({ menuPoints }) => {
  const [value, setValue] = useState<number>(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let index = menuPoints.findIndex(
      (point) => "/" + point.path === location.pathname
    );
    if (index === -1) {
      index = 0;
    }
    navigate("/" + menuPoints[index].path);
    setValue(index);
  }, [menuPoints]);

  useEffect(() => {
    let index = menuPoints.findIndex(
      (point) => "/" + point.path === location.pathname
    );
    if (index === -1) {
      index = 0;
    }
    setValue(index);
  }, [location.pathname]);

  function handleTabChange(
    e: React.SyntheticEvent<Element, Event> | null,
    newValue: string | number | null
  ): void {
    if (typeof newValue === "number") {
      setValue(newValue);
    }
  }

  function getTabs(): JSX.Element[] {
    return menuPoints.map((elem) => (
      <Tab key={elem.title} label={elem.title} component={Link} to={elem.path} />
    ))
  }

  return (
    <AppBar sx={{backgroundColor: "lightgray"}}>
      <Tabs
        value={value < menuPoints.length ? value : 0}
        onChange={handleTabChange}
        aria-label="basic tabs example"
      >
        {getTabs()}
      </Tabs>
    </AppBar>
  );
};

export default Navigator;
