import {useEffect, useState} from "react";

const Body = () => {
    // Updated type to include id
    const [barsArr, setBarsArr] = useState<Array<{ id: number; height: number; chars: string[]; offset: number; }>>([]);
    const [highlightedIds, setHighlightedIds] = useState<number[]>([]);
    const [isAnimating, setIsAnimating] = useState(false);
    const BAR_SPACING = 32;

    interface BarProps {
        id: number;
        chars: string[];
        height: number;
        offset: number;
    }

    const AsciiBar = ({id, chars, offset}: BarProps) => {
        return (
            <div
                className={`border-2 flex flex-col items-end absolute transition-all duration-100 ease-in-out
                ${highlightedIds.includes(id) ? 'border-emerald-400' : 'border-slate-500'
                    
                }`}
                style={{
                    writingMode: 'vertical-lr',
                    transform: `translateX(${offset}px)`,
                    transformOrigin: 'bottom right',
                }}
            >
                {chars}
            </div>
        );
    };

    useEffect(() => {
        const asciiChars = [
            '@', '#', '&', '$', '%',
            //')', '(', ']', '[', '}', '{', '*', '=', '+', ':', ';', '~', '"', ',', '^', '`', '\'', '-', '/', '\\', '|', '_', '.', '`'
        ]
        const newBars = Array(10).fill(0).map((_, index) => {
            const height = Math.floor(Math.random() * 35) + 1;
            const chars = Array.from(
                {length: height},
                () => asciiChars[Math.floor(Math.random() * asciiChars.length)]
            );
            return {
                id: index,
                height,
                chars,
                offset: index * BAR_SPACING
            };
        });
        setBarsArr(newBars);
        setIsAnimating(false);
    }, []);


    const bubbleSort = async (arr: Array<{ id: number; height: number; chars: string[]; offset: number; }>) => {
        /**
         - object and arrays in js are pass by reference
         - components re-render based on changes to state
         - react checks object references by equality === to determine if change occurred
         - checking references is much faster than doing a deep comparison of objects/arrays
         - if you directly mutate the state the reference to the object remains the same
         - even if the content has changed
         - hence the props and dependency arrays, checks if items === prevItems
         - //////////////////////////////////////////////////////////////////
         - react expects state to be immutable but objects technically are
         - instead of directly modifying the existing state you should create a
         - new copy of the state with the desired changes and the update the state
         - with a new copy, because react relies on reference equality checks
         - to determine if a components needs re-render
         - //////////////////////////////////////////
         */

            // Deep copy to help prevent unwanted mutation to id state
        const cpy = arr.map(obj => ({...obj}));

        // Outer loop: each pass through array
        for (let i = 0; i < cpy.length - 1; i++) {
            setIsAnimating(true); // UI state for animation
            let swapped = false; // track if any swaps occurred this pass, & stop early if sorted

            // Inner loop: compare adjacent elements
            for (let j = 0; j < cpy.length - i - 1; j++) {
                if (cpy[j].height > cpy[j + 1].height) {
                    // Preserve offset before swap
                    const tempJ = cpy[j].offset;
                    const tempJPlusOne = cpy[j+1].offset;

                    // Swap elements while preserving IDs and updating positions
                    cpy.splice(j, 2,
                        { ...cpy[j + 1], offset: tempJ },      // New object with swapped offset
                        { ...cpy[j], offset: tempJPlusOne }  // New object with swapped offset
                    );

                    setHighlightedIds([cpy[j].id, cpy[j + 1].id]); // Highlight swapped bars
                    setBarsArr([...cpy]); // Create new reference to trigger React re-render

                    await new Promise(resolve => setTimeout(resolve, 150)); // Animation delay
                    setHighlightedIds([]); // Clear highlights

                    // Mark that swap occurred
                    swapped = true;
                }
            }

            if (!swapped) break; // Array sorted if no swaps needed
        }
        setIsAnimating(false);
    };


    const SorterButton = () => {
        return (
            <div
                className="h-10 w-24 bg-emerald-500 text-black flex items-center justify-center cursor-pointer mr-4"
                onClick={async () => {
                    if (!isAnimating) {
                        await bubbleSort(barsArr);
                    }
                }}
            >
                Sort
            </div>
        )
    }

    return (
        <section className="h-screen w-screen flex justify-start ml-60 items-center">
            {SorterButton()}
            <div className="flex items-end h-10">
                {barsArr.map((bar) => (
                    <AsciiBar
                        key={bar.id}
                        id={bar.id}
                        height={bar.height}
                        chars={bar.chars}
                        offset={bar.offset}
                    />
                ))}
            </div>
        </section>
    );
};

export default Body;
