import React, { ReactNode, useEffect, useState } from 'react'
import CellsRow from './CellsRow'



type Props = {
  matrix: number [][];
  size: number;
}

const CellsMatrix: React.FC<Props> = ({ matrix, size }) => {

  function getRows(): ReactNode {
    return matrix.map((row, index) => 
      <CellsRow key={index} row={row} size={size / row.length} />)
  }

  return (
    <section style={{borderTop: "1px solid gray", borderLeft: "1px solid gray", width: size, height: size}}>
      {getRows()}
    </section>
  )
}

export default CellsMatrix