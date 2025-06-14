import {useEffect, useState} from "react";

interface CellProps {
    id: string;
    updateFn: (isAlive: boolean) => boolean;
}

const Cell = ({id, updateFn}: CellProps) => {
    const [isAlive, setIsAlive] = useState<boolean>(false)

    useEffect(()=> {
        if(isAlive){
            updateFn(isAlive)
        }
    }, [isAlive])

    return (
        <div onClick={() => {setIsAlive(!isAlive)}}
            className={`h-4 w-4 border
        border-gray-500 ${isAlive ? 'bg-green-300' : 'bg-black'}`}>
        </div>
    )
}


export default Cell

