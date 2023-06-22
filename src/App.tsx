import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import Lifes from './components/Lifes';
import { updateCellSize } from './redux/slices/cellSizeSlice';
import { updateDirection } from './redux/slices/flexDirectionSlice';

const App: React.FC = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    function handleScreenResize() {
      dispatch(updateCellSize());
      dispatch(updateDirection());
    }

    window.addEventListener('resize', handleScreenResize)
    return () => {
      window.removeEventListener('resize', handleScreenResize);
    }
  }, [])

  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", height: "100vh", width: "100vw"}}>
      <Lifes />
    </div>
  );
}

export default App;
