import Cell from "./Cell.tsx";
import {useState} from "react";

const GameOfLife = () => {

    const rows = 12
    const cols = 57

    const createEmptyBoard = () =>
        Array.from({length: rows}, () => Array.from({length: cols}, () => false))

    const [isAlive, setIsAlive] = useState<boolean>(false)

    const [boardState, setBoardState] = useState(createEmptyBoard)

    const resetBoardState = () => {
        setIsAlive(false)
        setBoardState(createEmptyBoard())
    }

    return (
        <div className="min-w-[950px] ml-4 flex flex-col justify-center items-center">
            <section className=" w-full h-52 flex flex-col">
                {
                    boardState.map((row, rowIndex) => (
                        <div className="flex">
                            {row.map((_, cellIndex) => {
                                return (
                                    <Cell
                                        key={`${rowIndex}-${cellIndex}`}
                                        isAlive={isAlive}
                                        setIsAlive={() => setIsAlive((prev) => !prev)}
                                    />
                                )
                            })}
                        </div>
                    ))}
            </section>
            <div className="flex gap-4">
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