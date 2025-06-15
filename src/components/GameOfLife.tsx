import {useState} from "react";

const GameOfLife = () => {

    const ROWS = 12
    const COLUMNS = 57

    const [grid] = useState(
        Array.from({length: ROWS}, (_, row) => {
            return Array.from({length: COLUMNS}, (_, col) => {
                const isAlive = Math.random() < 0.15 ? 1 : 0
                return [isAlive, row, col]
            })
        })
    )

    const transform = {
        NW: [-1, -1], N: [-1, 0], NE: [-1, 1], W: [0, -1], E: [0, 1], SW: [1, -1], S: [1, 0], SE: [1, 1]
    }


    function countNeighbors(cell: number[]) {
        let count = 0
        const [_, currentRow, currentCol] = cell

        //loop through the transforms w/ typscript bs
        for (const [_, [rowOffset, colOffset]] of Object.entries(transform)) {

            //compute the diff
            const neighborRow = currentRow + rowOffset
            const neighborCol = currentCol + colOffset

            //use the new coords to check is alive an in bounds
            if(neighborRow >= 0 && neighborRow <= ROWS &&
                neighborCol >= 0 && neighborCol <= COLUMNS ) {
                if(grid[neighborRow][neighborCol][0] === 1) {
                    count++
                }
            }
        }
        return count
    }

    countNeighbors([1, 4, 4])


    return (
        <>
            <div className="flex flex-col -ml-6 pb-3">
                {
                    grid.map((row) => (
                        <div className="flex">
                            {row.map((arr) => (
                                <div className={`h-4 w-4 border border-gray-500 ${arr[0] === 1 ? 'bg-zinc-500' : ''}`}>
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



