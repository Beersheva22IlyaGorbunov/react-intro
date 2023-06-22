import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setCount } from '../redux/slices/lifesCountSlice';
import { useSelectorDirection, useSelectorLifes } from '../redux/store'
import LifeMatrix from './LifeMatrix';

const Lifes: React.FC = () => {
  const flexDirection = useSelectorDirection();
  const count = useSelectorLifes();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCount(3));
  }, [])

  return (
    <section style={{display: "flex", flexDirection, alignItems: "center", justifyContent: "space-around", height: "100vh", width: "100vw"}}>
      {Array.from({length: count}).map(() => <LifeMatrix />)}
    </section>
  )
}

export default Lifes