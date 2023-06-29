import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { MenuPoint } from "../../App";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

type Props = {
  menuPoints: MenuPoint[];
};

const NavigatorPortrait: React.FC<Props> = ({ menuPoints }) => {
  const [value, setValue] = useState<number>(0);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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

  function handleMenuClick(index: number): void {
    handleDrawerClose();
    setValue(index);
  }

  function getTabs(): JSX.Element[] {
    return menuPoints.map((elem) => (
      <Tab key={elem.title} label={elem.title} component={Link} to={elem.path} />
    ))
  }

  return (
    <Box marginTop={6}>
      <AppBar
        color="inherit"
        sx={{
          backgroundColor: "lightgray",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          pl: 2,
          pr: 2
        }}
      >
        <IconButton
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
        >
          <MenuIcon />
        </IconButton>
        <Typography sx={{ml: "auto", mr: "auto", pr: 3}} variant="h6">{menuPoints[value]?.title ?? ""}</Typography>
      </AppBar>
      <Drawer
        sx={{
          flexShrink: 0,
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <IconButton
          sx={{ ml: "auto", width: "40px" }}
          onClick={handleDrawerClose}
        >
          <ChevronLeftIcon />
        </IconButton>
        <Divider />
        <Tabs
          value={value}
          orientation="vertical"
          onChange={(e, index) => handleMenuClick(index)}
          aria-label="basic tabs example"
        >
          {getTabs()}
        </Tabs>
      </Drawer>
      <Box sx={{p: 2}}>
        <Outlet></Outlet>
      </Box>
    </Box>
  );
};

export default NavigatorPortrait;
