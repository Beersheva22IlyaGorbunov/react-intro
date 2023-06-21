import React, { useEffect, useRef, useState } from 'react'
import lifeConfig from '../config/life-game-config.json'
import LifeGameService from '../service/LifeGameService';
import { getRandomIntMatrix } from '../utils/random';
import CellsMatrix from './CellsMatrix';

const ROW_SIZE_COEF = 0.9;

const LifeMatrix: React.FC = () => {
  const lifeGameService = useRef<LifeGameService>();
  const [matrix, setMatrix] = useState<number [][]>([]);
  const [screenSize, setScreenSize] = useState<number>(getMinimalSize())
  
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
    function handleScreenResize() {
      setScreenSize(getMinimalSize())
    }

    window.addEventListener('resize', handleScreenResize)

    const intervalId = setInterval(tickAction, lifeConfig.tick);
    return () => {
      clearInterval(intervalId);
      window.removeEventListener('resize', handleScreenResize);
    }
  }, [])

  return (
    <CellsMatrix matrix={matrix} size={screenSize * ROW_SIZE_COEF} />
  )
}

function getMinimalSize() {
  return window.innerWidth < window.innerHeight ? window.innerWidth : window.innerHeight;
}

export default LifeMatrix