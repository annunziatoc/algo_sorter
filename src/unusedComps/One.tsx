
import { useState, useEffect } from 'react';

interface Bar {
    id: number;
    height: number;
    charArr: string[];
}

const SortingVisualizer = () => {
    const [bars, setBars] = useState<Bar[]>([]);
    const [isSorting, setIsSorting] = useState(false);

    useEffect(() => {
        setBars(generateArray());
    }, []);

    const generateArray = (): Bar[] => {
        const chars = ["@", "%", "$", "!", "&"];
        return Array.from({ length: 10 }, (_, index) => {
            const height = Math.floor(Math.random() * 15) + 1;
            const setCharArr: string[] = [];

            for (let i = 0; i < height; i++) {
                setCharArr.push(chars[Math.floor(Math.random() * chars.length)]);
            }

            return {
                id: index,
                height,
                charArr: setCharArr,
            };
        });
    };

    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    const bubbleSort = async (oldArr: Bar[]) => {
        if (isSorting) return;
        setIsSorting(true);

        const array = [...oldArr];
        const n = array.length;

        try {
            for (let i = 0; i < n - 1; i++) {
                for (let j = 0; j < n - i - 1; j++) {
                    if (array[j].height > array[j + 1].height) {
                        // Swap elements
                        [array[j], array[j + 1]] = [array[j + 1], array[j]];
                        // Update state and wait
                        setBars([...array]);
                        await sleep(200);
                    }
                }
            }
        } finally {
            setIsSorting(false);
        }
    };

    const handleGenerateNew = () => {
        if (!isSorting) {
            setBars(generateArray());
        }
    };

    return (
        <div className="w-full h-screen bg-gray-100 p-4">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
                <div className="mb-4 space-x-4">
                    <button
                        className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600
                            ${isSorting ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={handleGenerateNew}
                        disabled={isSorting}
                    >
                        Generate New Array
                    </button>
                    <button
                        className={`px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600
                            ${isSorting ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={() => bubbleSort(bars)}
                        disabled={isSorting}
                    >
                        Bubble Sort
                    </button>
                </div>

                <div className="h-96 flex items-end justify-center space-x-2">
                    {bars.map((bar) => (
                        <div
                            key={bar.id}
                            className="w-16 flex items-center justify-center border border-gray-300
                                     transition-all duration-200 ease-in-out bg-indigo-500 text-white"
                            style={{
                                height: `${bar.height * 1.5}rem`,
                            }}
                        >
                            <div className="transform rotate-180 whitespace-nowrap">
                                {bar.charArr.join('')}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SortingVisualizer;