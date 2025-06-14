import React from "react";

interface Bar {
    id: number;
    height: number;
}

interface PromptAndButtonsProps {
    bars: Bar[];
    setIsSorted: (value: boolean) => void;
    setBars: React.Dispatch<React.SetStateAction<Bar[]>>;
    isSorting: boolean;
    bubbleSort: (bars: Bar[]) => Promise<void>;
    generateArray: () => Bar[];
}


const PromptAndButtons: React.FC<PromptAndButtonsProps> =
    ({
        bars,
        setIsSorted,
        setBars,
        isSorting,
        bubbleSort,
        generateArray
    }) => {
        return (
            <div className="flex flex-col gap-2 mr-6">
                <div className="flex  gap-2">
                    <button className={`text-nowrap  font-medium text-gray-300  
                    h-12 w-32 rounded-md bg-[#1A1A1AFF] 
                    border border-transparent hover:border-[#646cff] 
                    transition duration-[250ms] cursor-pointer 
                    ${isSorting ? "opacity-50" : ""}`}
                        onClick={() => {
                            setIsSorted(false)
                            setBars(generateArray())
                        }}
                        disabled={isSorting}>
                        Gen New Arr
                    </button>
                    <button
                        className={`text-nowrap  font-medium text-gray-300  
                    h-12 w-32 rounded-md bg-[#1A1A1AFF] 
                    border border-transparent hover:border-[#646cff] 
                    transition duration-[250ms] cursor-pointer ${isSorting ? "opacity-50" : ""}`}
                        onClick={() => (bubbleSort(bars))}
                        disabled={isSorting}>
                        Bubble Sort
                    </button>
                </div>

            </div>
        )
    }

export default PromptAndButtons











