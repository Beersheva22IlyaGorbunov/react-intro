import React, { ReactNode } from 'react'

type Props = {
  row: number [];
  size: number;
}

const CellsRow: React.FC<Props> = ({ row, size }) => {

  function getDivs(): ReactNode {
    return row.map((num, index) => 
      <div key={index} style={{backgroundColor: num ? "black" : "white", width: size, borderBottom: "1px solid gray", borderRight: "1px solid gray"}}></div>)
  }

  return (
    <div style={{display: "flex", height: size}}>
      {getDivs()}
    </div>
  )
}

export default CellsRow
