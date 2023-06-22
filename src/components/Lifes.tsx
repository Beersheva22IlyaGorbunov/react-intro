import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setCount } from '../redux/slices/lifesCountSlice';
import { useSelectorDirection, useSelectorLifes } from '../redux/store'
import Input from './common/Input';
import { InputResult } from './common/types';
import LifeMatrix from './LifeMatrix';
import lifesConfig from '../config/life-game-config.json'

const { minLifes, maxLifes } = lifesConfig

const Lifes: React.FC = () => {
  const flexDirection = useSelectorDirection();
  const count = useSelectorLifes();
  const dispatch = useDispatch();

  function inputSubmitFn(inputedNum: string): InputResult {
    const result: InputResult = {
      status: "error",
      message: `You should enter number in range ${minLifes} - ${maxLifes}`
    }
    if (Number.isInteger(inputedNum) && inputedNum >= minLifes && inputedNum <= maxLifes) {
      result.status = "success"
      result.message = ""
    }
    return result;
  }

  useEffect(() => {
    dispatch(setCount(3));
  }, [])

  return (
    <>
      <section style={{display: "flex", flexDirection, alignItems: "center", justifyContent: "space-around", height: "100vh", width: "100vw"}}>
        {Array.from({length: count}).map(() => <LifeMatrix />)}
      </section>
      <Input placeholder={'Enter number of lifes'} type="number" submitFn={inputSubmitFn} />
    </>
  )
}

export default Lifes