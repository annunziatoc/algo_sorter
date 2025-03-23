import Cell from "./Cell.tsx";
import {useState} from "react";

const GameOfLife = () => {

    const rows = 12
    const cols = 57

    // const [globalAlive, setGlobalAlive] = useState(false)

    const [boardState, setBoardState] = useState<boolean[][]>(
        Array.from({length: rows}, () => Array.from({length: cols}, () => false))
    )

    const [reset, setReset] = useState<boolean>(false)
    const resetBoardState = () => {
        setReset(true)
        setBoardState(Array.from({length: rows}, () => Array.from({length: cols}, () => false)))
        setTimeout(() => {
            setReset(false)
        }, 100)
    }


    return (
        <div className="min-w-[950px] ml-4 flex flex-col justify-center items-center">
            <section className=" w-full h-52 flex flex-col">
                {
                    boardState.map((row, rowIndex) => (
                        <div key={`${rowIndex}`} className="flex">
                            {row.map((_, cellIndex) => {
                                return (
                                    <Cell
                                        key={`${rowIndex}-${cellIndex}`}
                                        reset={reset}
                                    />
                                )
                            })}
                        </div>
                    ))}
            </section>
            <div className="flex gap-4 mb-2">
                <button className="bg-amber-300 h-8 w-14 text-black flex justify-center items-center
            mb-2">Start
                </button>
                <button onClick={resetBoardState} className="bg-amber-300 h-8 w-14 text-black
                 flex justify-center items-center
            mb-2">Reset
                </button>
            </div>
        </div>
    )
}


export default GameOfLife