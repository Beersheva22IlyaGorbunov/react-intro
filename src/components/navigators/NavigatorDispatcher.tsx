import { Box, Paper, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import { MenuPoint } from "../../App";
import Navigator from "./Navigator";
import NavigatorPortrait from "./NavigatorPortrait";

type Props = {
  menuPoints: MenuPoint[];
};

const NavigatorDispatcher: React.FC<Props> = ({ menuPoints }) => {
  const theme = useTheme();
  const isPortrait = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box mt={isPortrait ? 4 : 6}>
      {!isPortrait ? (
        <Navigator menuPoints={menuPoints} />
      ) : (
        <NavigatorPortrait menuPoints={menuPoints} />
      )}
      <Box sx={{ p: 2 }}>
        <Outlet></Outlet>
      </Box>
    </Box>
  );
};

export default NavigatorDispatcher;
