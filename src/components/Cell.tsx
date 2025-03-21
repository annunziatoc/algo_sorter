import React from "react";

type CellProps = {
    isAlive: boolean
    setIsAlive: React.Dispatch<React.SetStateAction<boolean>>

}

const Cell = ({isAlive, setIsAlive}: CellProps) => {

    return (
        <div onClick={() => setIsAlive(!isAlive)} className={`h-4 w-4 border 
        border-gray-500 ${isAlive ? 'bg-green-300' : 'bg-black'}`}>
        </div>
    )
}


export default Cell