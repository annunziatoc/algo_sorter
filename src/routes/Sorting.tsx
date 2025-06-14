import {useEffect, useState} from "react";
import PromptAndButtons from "../components/PromptAndButtons.tsx";

const Sorting = () => {

    interface Bar {
        id: number;
        height: number;
    }

    const [isSorting, setIsSorting] = useState(false)
    const [isSorted, setIsSorted] = useState(false)
    const [highlighted, setHighlighted] = useState<number[]>([])
    const [bars, setBars] = useState<Bar[]>([])


    useEffect(() => {
        setBars(generateArray())
    }, []);


    const generateArray = () => {
        // generate series of  bars using an Array of Bar Objects
        return Array.from(
            {length: 18},
            //return a unique object to put into each array slot up to {length} # of times
            (_, index) => {
                const height = Math.floor(Math.random() * 15) + 1

                return {
                    id: index,
                    height: height,
                }
            }
        )
    }

    const bubbleSort = async (oldArr: Bar[]) => {
        //return early if already sorted
        if (!isSorted) {
            setIsSorting(true)

            //dont work with original
            const array = [...oldArr]
            const n = array.length

            for (let i = 0; i < n - 1; i++) {
                for (let j = 0; j < n - i - 1; j++) {

                    //swap in memory
                    if (array[j].height > array[j + 1].height) {
                        [array[j], array[j + 1]] = [array[j + 1], array[j]]
                        setHighlighted([array[j].id, array[j + 1].id])
                    }
                    //swap the ui
                    setBars([...array])
                    await new Promise((resolve) => setTimeout(resolve, 60))
                    setHighlighted([])
                }
            }
            setIsSorting(false)
        }
        setIsSorted(true)
    }


    return (
        <>
            <div className="h-screen flex justify-center items bg-gray-800">
                <div className="flex flex-col">
                    <div className="flex items-end h-60">
                                              {bars.map((bar) => {
                            return (
                                <div key={bar.id} className={`w-6 h-10 border-2 rounded-md flex 
                                items-center justify-end py-1 px-4 pt-4  ml-1
                         ${highlighted.includes(bar.id) ? "border-cyan-400" : ""}`}
                                     style={{
                                         height: `${bar.height}rem`,
                                         transition: 'all 60ms ease-in-out'
                                     }}>
                                </div>
                            )
                        })}

                    </div>

                    <div className="flex gap-2 p-2">
                        <PromptAndButtons
                            bars={bars} setBars={setBars}
                            setIsSorted={setIsSorted} isSorting={isSorting}
                            bubbleSort={bubbleSort} generateArray={generateArray}/>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Sorting;



