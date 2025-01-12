import { useState, useEffect } from "react";

const BubbleSort = () => {
    interface Bar {
        id: number;
        height: number;
        offset: number;
    }

    const generateRandomArray = (length = 15): Bar[] => {
        return Array.from({ length }, (_, index) => ({
            id: index,
            height: Math.floor(Math.random() * 150) + 20,
            offset: index * BAR_SPACING
        }));
    };

    const BAR_WIDTH = 30;
    const BAR_SPACING = 40;

    const [bars, setBars] = useState<Bar[]>([]);
    const [highlightedIds, setHighlightedIds] = useState<number[]>([]);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        setBars(generateRandomArray());
    }, []);

    const bubbleSort = async (arr: Bar[]) => {
        // Create deep copy to prevent unwanted mutations
        const cpy = arr.map(obj => ({...obj}));
        setIsAnimating(true);

        for (let i = 0; i < cpy.length - 1; i++) {
            let swapped = false;

            for (let j = 0; j < cpy.length - i - 1; j++) {
                if (cpy[j].height > cpy[j + 1].height) {
                    // Preserve offsets before swap
                    const tempOffset = cpy[j].offset;
                    const nextOffset = cpy[j + 1].offset;

                    // Swap elements while preserving IDs and updating positions
                    // Modifies array in place
                    cpy.splice(j, 2,
                        { ...cpy[j + 1], offset: tempOffset },
                        { ...cpy[j], offset: nextOffset }
                    );

                    setHighlightedIds([cpy[j].id, cpy[j + 1].id]);
                    setBars([...cpy]);

                    await new Promise(resolve => setTimeout(resolve, 150));
                    setHighlightedIds([]);

                    swapped = true;
                }
            }

            if (!swapped) break;
        }

        setIsAnimating(false);
    };

    const resetArray = () => {
        if (!isAnimating) {
            setBars(generateRandomArray());
            setHighlightedIds([]);
        }
    };

    return (
        <div className="text-center p-8">
            <h1 className="text-2xl font-bold mb-8">Bubble Sort Visualizer</h1>
            <div className="flex justify-center mb-8">
                <div className="relative h-96 w-full max-w-4xl bg-gray-100 rounded-lg">
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full h-full">
                        {bars.map((bar) => (
                            <div
                                key={bar.id}
                                className={`absolute bottom-0 transition-all duration-150 ease-in-out ${
                                    highlightedIds.includes(bar.id)
                                        ? "bg-emerald-500"
                                        : "bg-blue-500"
                                }`}
                                style={{
                                    width: `${BAR_WIDTH}px`,
                                    height: `${bar.height}px`,
                                    transform: `translateX(${bar.offset}px)`,
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className="space-x-4">
                <button
                    onClick={() => !isAnimating && bubbleSort(bars)}
                    disabled={isAnimating}
                    className={`px-6 py-3 rounded-lg text-lg ${
                        isAnimating
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600 text-white"
                    }`}
                >
                    Start Sorting
                </button>
                <button
                    onClick={resetArray}
                    disabled={isAnimating}
                    className={`px-6 py-3 rounded-lg text-lg ${
                        isAnimating
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-green-500 hover:bg-green-600 text-white"
                    }`}
                >
                    Generate New Array
                </button>
            </div>
        </div>
    );
};

export default BubbleSort;