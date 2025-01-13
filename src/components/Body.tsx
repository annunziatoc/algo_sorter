import {useEffect, useState} from "react";
import Logo from "./Logo.tsx";
import PromptAndButtons from "./PromptAndButtons.tsx";

const Body = () => {

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
            {length: 15},
            //return a unique object to put into each array slot up to {length} # of times
            (_, index) => {
                //setup
                const height = Math.floor(Math.random() * 15) + 1

                return {
                    id: index,
                    height: height,
                }
            }
        )
    }

    const bubbleSort = async (oldArr: Bar[]) => {
        if (!isSorted) {
            setIsSorting(true)

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
                    await new Promise((resolve) => setTimeout(resolve, 75))
                    setHighlighted([])
                }
            }
            setIsSorting(false)
        }
        setIsSorted(true)
    }


    return (
        <>
            <div className="h-screen w-screen bg-gray-700 p-4">
                <Logo className="h-10 stroke-gray-400 stroke-2"/>
                <div className="flex items-end w-full h-96 mt-10">
                    <PromptAndButtons
                        bars={bars} setBars={setBars}
                        setIsSorted={setIsSorted} isSorting={isSorting}
                        bubbleSort={bubbleSort} generateArray={generateArray}/>
                    {bars.map((bar) => {
                        return (
                            <div key={bar.id} className={`w-6 h-10 border-2 rounded-md flex items-center justify-end py-1 px-4 pt-4  ml-1
                         ${highlighted.includes(bar.id) ? "border-cyan-400" : ""}`}
                                 style={{
                                     height: `${bar.height}rem`,
                                     transition: 'all 75ms ease-in-out'
                                 }}>
                            </div>
                        )
                    })}
                </div>
            </div>


        </>
    )
}

export default Body;

