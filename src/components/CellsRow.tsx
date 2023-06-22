import React, { ReactNode } from 'react'

type Props = {
  row: number [];
  size: number;
}

const CellsRow: React.FC<Props> = ({ row, size }) => {

  function getDivs(): ReactNode {
    return row.map((num, index) => 
      <div key={index} style={{backgroundColor: num ? "black" : "white", width: `${size}px`, height: `${size}px`, borderBottom: "1px solid gray", borderRight: "1px solid gray"}}></div>)
  }

  return (
    <div style={{display: "flex"}}>
      {getDivs()}
    </div>
  )
}

export default CellsRow
