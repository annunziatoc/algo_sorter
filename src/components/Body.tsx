import {useEffect, useState} from "react";
import Logo from "./Logo.tsx";
import PromptAndButtons from "./PromptAndButtons.tsx";
import CodeBlock from "./CodeBlock.tsx";
import codeString from './raw_body_text.txt?raw'

const Body = () => {

    interface Bar {
        id: number;
        height: number;
    }

    const [isSorting, setIsSorting] = useState(false)
    const [isSorted, setIsSorted] = useState(false)
    const [highlighted, setHighlighted] = useState<number[]>([])
    const [bars, setBars] = useState<Bar[]>([])
    const [showCode, setShowCode] = useState(false)


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
            <div className="h-screen w-screen bg-gray-700 p-4">
                <Logo className="h-10 stroke-gray-400 stroke-2"/>

                <div className="w-screen flex flex-col justify-center items-start gap-4 bg-gray-700">
                    <div className="flex items-end w-full h-96 mt-10 ">

                        <PromptAndButtons
                            bars={bars} setBars={setBars}
                            setIsSorted={setIsSorted} isSorting={isSorting}
                            bubbleSort={bubbleSort} generateArray={generateArray}/>

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

                    <div className="max-w-5xl">
                        <button className="" onClick={() => setShowCode(!showCode)}>
                            Click to see my code</button>
                        {showCode?
                            <CodeBlock code={`${codeString}`}></CodeBlock>
                            : ''
                        }
                    </div>

                </div>
            </div>
        </>
    )
}

export default Body;

