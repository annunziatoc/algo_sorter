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

//x-axis is position in array, y-axis is height of bars
    const generateArray = () => {
        // generate series of  bars using an array of bar objects
        return Array.from(
            {length: 29},
            (_, index) => {
                const height = Math.floor(Math.random() * 15) + 1

                return {
                    //immutable identifier even when array gets rearranged
                    id: index,
                    //height used as measure for ascending order sorting
                    height: height,
                }
            }
        )
    }

    const bubbleSort = async (originalArr: Bar[]) => {
        const array = [...originalArr]
        //return early if already sorted
        if (!isSorted) {
            setIsSorting(true)
            //dont work with original
            const n = array.length
            for (let i = 0; i < n - 1; i++) {
                for (let j = 0; j < n - i - 1; j++) {
                    //visualize every comparison
                    setHighlighted([array[j].id, array[j + 1].id]);
                    //swap in memory
                    if (array[j].height > array[j + 1].height) {
                        [array[j], array[j + 1]] = [array[j + 1], array[j]]
                    }
                    setBars([...array]);
                    //no more code in this function runs until the promise resolves
                    //this function execution will block but thread level is still concurrent
                    await new Promise((resolve) => setTimeout(resolve, 20))
                    setHighlighted([])
                }
            }
            setIsSorting(false)
        }
        setIsSorted(true)
    }


    const selectionSort = async (originalArr: Bar[]) => {
        const array = [...originalArr]

        if (!isSorted) {
            setIsSorting(true)
            for (let i = 0; i < array.length - 1; i++) {
                //store the index so we can use j outside the loop
                //assume first position has the min for now
                //on increment of i, after the first min is placed we go to the next i + 1
                let minIndex = i
                for (let j = i + 1; j < array.length; j++) {
                    //compare heights, to know which values to swap
                    if (array[j].height < array[minIndex].height) {
                        minIndex = j
                    }
                }
                //highlight the bars being swapped by adding id to array
                setHighlighted([array[minIndex].id, array[i].id]);

                //swap the bars to push min to next-most front position
                [array[i], array[minIndex]] = [array[minIndex], array[i]]

                //update the reference and pause for react
                setBars([...array])
                //tell react to rerender
                await new Promise((resolve) => setTimeout(resolve, 75))
                //un-highlight
                setHighlighted([])

            }
            setIsSorting(false)
        }
        setIsSorted(true)
    }


    //need a wrapper to initialize the indices
    const mergeSort = async (originalArr: Bar[]) => {
        const array = [...originalArr]

        if (!isSorted) {
            setIsSorting(true)
            await splitArray(array, 0, array.length - 1)
            setIsSorting(false)
        }
        setIsSorted(true)
    }

    const splitArray = async (array: Bar[], leftIndex: number, rightIndex: number) => {
        //strategy is to keep the array but pass indices to work on specific sections of it
        //split until the indices are equal then return
        if (leftIndex >= rightIndex) return array

        const mid = Math.floor((leftIndex + rightIndex) / 2)

        //let's split
        await splitArray(array, leftIndex, mid)
        await splitArray(array, mid + 1, rightIndex)

        //let's merge
        await mergeInPlace(array, leftIndex, mid, rightIndex)
    }

    async function mergeInPlace(array: Bar[], leftIndex: number, mid: number, rightIndex: number) {

        //compare using proxies, but don't write with these arrays
        const leftArray = array.slice(leftIndex, mid + 1)
        const rightArray = array.slice(mid + 1, rightIndex + 1)

        let i = 0
        let j = 0
        let k = leftIndex

        while(i < leftArray.length && j < rightArray.length) {
            setHighlighted([leftArray[i].id, rightArray[j].id])

            if(leftArray[i].height <= rightArray[j].height) {
                array[k] = leftArray[i]
                i++
            } else {
                array[k] = rightArray[j]
                j++
            }
            k++

            setBars([...array])
            await new Promise(resolve => setTimeout(resolve, 50))
            setHighlighted([])
        }

        //copy remaining
        while (i < leftArray.length) {
            array[k] = leftArray[i];
            i++; k++;
            setBars([...array]);
            await new Promise(resolve => setTimeout(resolve, 25));
        }
        while (j < rightArray.length) {
            array[k] = rightArray[j];
            j++; k++;
            setBars([...array]);
            await new Promise(resolve => setTimeout(resolve, 25));
        }
    }


    return (
        <>
            <div className="h-screen flex justify-center items bg-gray-800">
                <div className="flex flex-col">
                    <div className="flex items-end h-60">
                        {bars.map((bar) => { //display an array of bars that will
                            // be highlighted and updated on state change
                            return (
                                <div
                                    key={bar.id} className={`border-2 rounded-md flex 
                                items-center justify-end py-1 px-3 pt-4 ml-0.5
                         ${highlighted.includes(bar.id) ? "border-cyan-400 bg-cyan-700" : ""}`}
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
                            bubbleSort={bubbleSort} selectionSort={selectionSort}
                            mergeSort={mergeSort}
                            generateArray={generateArray}/>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Sorting;



