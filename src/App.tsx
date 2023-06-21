import React, { useEffect, useState } from 'react';
import './App.css';
import LifeMatrix from './components/LifeMatrix';

const App: React.FC = () => {
  
  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", gap: "1rem"}}>
      <LifeMatrix />
      <LifeMatrix />
    </div>
  );
}

export default App;
