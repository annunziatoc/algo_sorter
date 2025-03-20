import Cell from "./Cell.tsx";
import React, {useRef} from "react";

const GameOfLife = () => {

    const cellRef: React.RefObject<HTMLDivElement | null> = useRef(null)

    const generation = Array.from({length: 70}, (_, index) => (
        <div key={index}>
            {
                Array.from({length: 12}, (_, index) => {
                    return (
                        <div key={index}>
                            <Cell cellRef={cellRef}/>
                        </div>
                    )
                })
            }
        </div>
    ))

    return (
        <div className="flex flex-col justify-center items-center">
            <section className=" w-full h-52  flex justify-center">
                {
                    [...generation]
                }
            </section>
            <div className="flex gap-4">
                <button className="bg-amber-300 h-8 w-14 text-black flex justify-center items-center
            mb-2">Start
                </button>
                <button className="bg-amber-300 h-8 w-14 text-black flex justify-center items-center
            mb-2">Reset
                </button>
            </div>
        </div>
    )
}


export default GameOfLife