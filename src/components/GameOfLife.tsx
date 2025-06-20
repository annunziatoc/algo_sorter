import {useEffect, useState} from "react";

const GameOfLife = () => {

    const ROWS = 12
    const COLUMNS = 57

    const [grid, setGrid] = useState(
        Array.from({length: ROWS}, (_, row) => {
            return Array.from({length: COLUMNS}, (_, col) => {
                const isAlive = Math.random() < 0.25 ? 1 : 0
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
            if(neighborRow >= 0 && neighborRow < ROWS &&
                neighborCol >= 0 && neighborCol < COLUMNS ) {
                if(grid[neighborRow][neighborCol][0] === 1) {
                    count++
                }
            }
        }
        return count
    }


    function gameOfLife() {
        const newGrid = grid.map((row) => row.map((cell) => [...cell] ))

        grid.forEach((row,i) => {
            row.forEach((cell,j) => {
                const ncount = countNeighbors(cell)
                const isAlive = cell[0] === 1

                //survival
                if(isAlive && (ncount < 2 || ncount > 3)){
                    newGrid[i][j][0] = 0
                }
                //birth
                if(cell[0] === 0 && ncount === 3) {
                    newGrid[i][j][0] = 1
                }
            })
        })
        setGrid(newGrid)
    }



    useEffect(() => {
        const interval = setInterval(() => {
            gameOfLife()
        }, 100)
        return () => clearInterval(interval)
    })

    useEffect(() => {
        const resetTimer = setInterval(() => {
            setGrid(Array.from({length: ROWS}, (_, row) => {
                return Array.from({length: COLUMNS}, (_, col) => {
                    const isAlive = Math.random() < 0.25 ? 1 : 0
                    return [isAlive, row, col]
                })
            }))
        }, 20000)

        return () => clearTimeout(resetTimer)
    }, [])




    return (
        <>
            <div className="flex flex-col -ml-6 pb-3">
                {
                    grid.map((row, rowIdx) => (
                        <div key={rowIdx} className="flex">
                            {row.map((cell, cellIdx) => (
                                <div key={cellIdx} className={`h-4 w-4 border border-gray-500 ${cell[0] === 1 ? 'bg-zinc-500' : ''}`}>
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



