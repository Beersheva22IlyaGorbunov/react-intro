import { useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import { MenuPoint } from '../../App';
import Navigator from './Navigator';
import NavigatorPortrait from './NavigatorPortrait';

type Props = {
  menuPoints: MenuPoint[];
};

const NavigatorDispatcher: React.FC<Props> = ({ menuPoints }) => {
  const theme = useTheme();
  const isPortrait = useMediaQuery(theme.breakpoints.down('md'))
  return !isPortrait ? <Navigator menuPoints={menuPoints} /> : <NavigatorPortrait menuPoints={menuPoints} />;
}

export default NavigatorDispatcher