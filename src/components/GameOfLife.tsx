import Cell from "./Cell.tsx";
import {useState} from "react";

const GameOfLife = () => {

    const ROWS = 12
    const COLUMNS = 57
    const [updateKey, setUpdateKey] = useState(0)
    const [boardState, setBoardState] = useState<boolean[][]>(
        Array.from({length: ROWS}, () => Array.from({length: COLUMNS}, () => false))
    )

    const resetBoardState = () => {
        setUpdateKey((prev) => prev + 1)
        setBoardState(Array.from({length: ROWS}, () => Array.from({length: COLUMNS}, () => false)))
    }

    const surroundCell = (updateKey, rowIndex, cellIndex) => {

        const newBoardState = [...boardState]

        newBoardState[rowIndex] = [...newBoardState[rowIndex]]
        if(`${updateKey}-${rowIndex}-${cellIndex}`)
        newBoardState[rowIndex][cellIndex + 1] = true
        setBoardState(newBoardState)
    }

    // const differenceMatrix = [
    //     [-1, -1], [-1, 0], [-1, 1],
    //     [0, -1], [0, 0], [0, 1],
    //     [1, -1], [1, 0], [1, 1],
    // ]


    return (
        <div className="min-w-[950px] ml-4 flex flex-col justify-center items-center">
            <section className=" w-full h-52 flex flex-col">
                {
                    boardState.map((row, rowIndex) => (
                        <div key={`${rowIndex}`} className="flex">
                            {row.map((_, cellIndex) => {
                                return (
                                    <Cell
                                        key={`${updateKey}-{${rowIndex}-${cellIndex}`}
                                        id={`${updateKey}-{${rowIndex}-${cellIndex}`}
                                        updateFn ={surroundCell}
                                    />
                                )
                            })}
                        </div>
                    ))}
            </section>
        </div>
    )
}


export default GameOfLife



