import {useState} from "react";

const GameOfLife = () => {

    const ROWS = 12
    const COLUMNS = 57

    const [grid, setGrid]  = useState(
        Array.from({length: ROWS}, (_,row) => {
            return Array.from({length: COLUMNS}, (_,col) => {
                const isAlive = Math.random() < 0.15 ?  1 : 0
                return [isAlive,row,col]
            })
        })
    )

    console.log(grid)





    return (
        <>
            <div className="flex flex-col -ml-6 pb-3">
                {
                    grid.map((row) => (
                        <div className="flex">
                            {row.map((arr) => (
                                    <div className={`h-4 w-4 border border-gray-500 ${arr[0] === 1 ? 'bg-zinc-500' :  ''}`}>
                                    </div>
                            ))}
                        </div>
                    ))
                }
            </div>
        </>
    )

}


export default GameOfLife



