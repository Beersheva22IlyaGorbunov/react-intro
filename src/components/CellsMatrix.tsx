import React, { ReactNode } from 'react'
import { useSelector } from 'react-redux';
import { useSelectorLifes } from '../redux/store';
import { RootState } from '../redux/types';
import CellsRow from './CellsRow'

type Props = {
  matrix: number [][];
}

const CellsMatrix: React.FC<Props> = ({ matrix }) => {
  const cellSize = useSelector<RootState, number>((state: RootState) => state.cellSizeState.size)
  const lifesCount = useSelectorLifes();

  function getRows(): ReactNode {
    return matrix.map((row, index) => 
      <CellsRow key={index} row={row} size={cellSize / lifesCount} />)
  }

  return (
    <section style={{borderTop: "1px solid gray", borderLeft: "1px solid gray"}}>
      {getRows()}
    </section>
  )
}


export default CellsMatrix