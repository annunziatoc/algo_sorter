import React, {useState} from "react";

type CellProps = {
    cellRef : React.RefObject<HTMLDivElement | null>
}

const Cell = ({cellRef} : CellProps) => {
    const [isAlive, setIsAlive] = useState(false)
    return (
        <div ref={cellRef} onClick={() => setIsAlive(!isAlive)} className={`h-4 w-4 border 
        border-gray-500 ${isAlive ? 'bg-green-300' : 'bg-black'}`}>
        </div>
    )
}


export default Cell