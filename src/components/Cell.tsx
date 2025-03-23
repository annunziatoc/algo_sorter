import {useEffect, useState} from "react";


const Cell = (props: {reset: boolean}) => {

    const [isAlive, setIsAlive] = useState<boolean>(false)

    useEffect(() => {
            setIsAlive(false)
    }, [props.reset]);


    return (
        <div onClick={() => {setIsAlive(!isAlive)}}
            className={`h-4 w-4 border
        border-gray-500 ${isAlive ? 'bg-green-300' : 'bg-black'}`}>
        </div>
    )
}


export default Cell