import {useEffect, useState} from "react";

const Body = () => {
    // Updated type to include id
    const [barsArr, setBarsArr] = useState<Array<{ id: number; height: number; chars: string[]; offset: number; }>>([]);
    const [highlightedIds, setHighlightedIds] = useState<number[]>([]);
    const [isSwapping, setIsSwapping] = useState(false);
    const BAR_SPACING = 32;

    const SorterButton = () => {
        return (
            <div
                className="h-10 w-24 bg-emerald-500 text-black flex items-center justify-center cursor-pointer mr-4"
                onClick={async () => {
                    if (!isSwapping) {
                        await bubbleSort(barsArr);
                    }
                }}
            >
                Sort
            </div>
        )
    }

    useEffect(() => {
        const asciiChars = [
            '@', '#', '&', '$', '%', ')', '(', ']', '[', '}', '{', '*', '=', '+', ':', ';', '~', '"', ',', '^', '`', '\'', '-', '/', '\\', '|', '_', '.', '`'
        ]
        const newBars = Array(15).fill(0).map((_, index) => {
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
    }, []);

    const bubbleSort = async (arr: Array<{ id: number; height: number; chars: string[]; offset: number; }>) => {
        for (let i = 0; i < arr.length - 1; i++) {
             // Prevents multiple sorts
            setIsSwapping(true);
            let swapped = false;

            for (let j = 0; j < arr.length - i - 1; j++) {
                if (arr[j].height > arr[j + 1].height) {
                    // Set highlighted IDs for the bars being swapped
                    setHighlightedIds([arr[j].id, arr[j + 1].id]);
                    // Swap offsets
                    [arr[j].offset, arr[j + 1].offset] = [arr[j + 1].offset, arr[j].offset];
                    // Swap elements
                    // Update state
                    setBarsArr([...arr])
                    await new Promise(resolve => setTimeout(resolve, 100));
                        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    // Wait for transition to complete
                    // Clear highlights after swap
                    setHighlightedIds([]);
                    swapped = true;
                }
            }

            if (!swapped) break; // If no swaps were made in this pass, array is sorted
        }
        setIsSwapping(false);
    };

    interface BarProps {
        id: number;
        height: number;
        chars: string[];
        offset: number;
    }

    const AsciiBar = ({id, chars, offset}: BarProps) => {
        return (
            <div
                className={`border-2 flex flex-col items-end absolute transition-all duration-100 ease-in-out
                ${highlightedIds.includes(id) ? 'border-emerald-400' : ' border-slate-500'
                }`}
                style={{
                    writingMode: 'vertical-lr',
                    transform: `translateX(${offset}px)`,
                    transformOrigin: 'bottom right',
                    // transition: 'all 1000ms ease-in-out '
                }}
            >
                {chars}
            </div>
        );
    };

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



