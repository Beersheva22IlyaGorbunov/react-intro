import React, { useEffect, useRef, useState } from 'react'
import lifeConfig from '../config/life-game-config.json'
import LifeGameService from '../service/LifeGameService';
import { getRandomIntMatrix } from '../utils/random';
import CellsMatrix from './CellsMatrix';

const LifeMatrix: React.FC = () => {
  const lifeGameService = useRef<LifeGameService>();
  const [matrix, setMatrix] = useState<number [][]>([]);
  
  
  function tickAction(): void {
    if (!lifeGameService.current) {
      lifeGameService.current = new LifeGameService(
        getRandomIntMatrix(lifeConfig.dimension, lifeConfig.dimension, 0, 2));
      setMatrix(lifeGameService.current.numbers);
    } else {
      setMatrix(lifeGameService.current.next());
    }
  }

  useEffect(() => {
    const intervalId = setInterval(tickAction, lifeConfig.tick);
    return () => clearInterval(intervalId);
  }, [])

  return (
    <CellsMatrix matrix={matrix} />
  )
}

export default LifeMatrix