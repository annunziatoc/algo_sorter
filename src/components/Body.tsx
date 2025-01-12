import {useEffect, useState} from "react";

const Body = () => {

    interface Bar {
        id: number;
        height: number;
        charArr: string[];
    }

    const [isSorting, setIsSorting] = useState(false)
    const [isSorted, setIsSorted] = useState(false)
    const [highlighted, setHighlighted] = useState<number[]>([])
    const [bars, setBars] = useState<Bar[]>([])


    useEffect(() => {
        setBars(generateArray())
    }, []);


    const generateArray = () => {
        const chars = ["@", "%", "$", "!", "&"]
        // generate series of  bars using an Array of Bar Objects
        return Array.from(
            {length: 15},
            //return a unique object to put into each array slot up to {length} # of times
            (_, index) => {
                //setup
                const height = Math.floor(Math.random() * 15) + 1
                const setCharArr: string[] = []

                //do this next thing 1-15 times
                for (let i = 0; i < height; i++) {
                    //push one of the chars at random into the array
                    setCharArr.push(chars[Math.floor(Math.random() * chars.length)])
                }

                return {
                    id: index,
                    height: height,
                    charArr: setCharArr
                }
            }
        )
    }

    const bubbleSort = async (oldArr: Bar[]) => {
        if(!isSorted){
            setIsSorting(true)

            const array = [...oldArr]
            const n = array.length

            for (let i = 0; i < n - 1; i++) {
                for (let j = 0; j < n - i - 1; j++) {

                    //swap in memory
                    if (array[j].height > array[j + 1].height) {
                        [array[j], array[j + 1]] = [array[j + 1], array[j]]
                        setHighlighted([array[j].id, array[j+1].id])
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
            <div className="h-screen w-screen bg-gray-700 flex justify-start items-center">
                <div className="flex items-end w-screen h-96">
                    <button className={`ml-[15%] text-nowrap`}
                            onClick={() => {
                                setIsSorted(false)
                                setBars(generateArray())}}
                            disabled={isSorting}>
                        Gen New Arr
                    </button>
                    <button className={`mx-2 text-nowrap ${isSorting ? "opacity-50 cursor-not-allowed" : ""}`}
                            onClick={() => (bubbleSort(bars))}
                            disabled={isSorting}>
                        Bubble Sort
                    </button>

                    {bars.map((bar) => {
                        return (
                            <div key={bar.id} className={`w-6 h-10 border-2 rounded-md flex items-center justify-end py-1 px-4 pt-4  ml-1
                         ${highlighted.includes(bar.id) ? "border-cyan-400" : ""}`}
                                 style={{
                                     height: `${bar.height}rem`,
                                     writingMode: "vertical-lr",
                                     transition: 'all 75ms ease-in-out'
                                 }}>
                                <p className="">
                                    {bar.charArr.join("")}
                                </p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Body;

