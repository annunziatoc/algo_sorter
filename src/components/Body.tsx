import {useEffect, useState} from "react";

const Body = () => {
    // Updated type to include id
    const [barsArr, setBarsArr] = useState<Array<{ id: number; height: number; chars: string[]; offset: number; }>>([]);
    const [highlightedIds, setHighlightedIds] = useState<number[]>([]);
    const [isSwapping, setIsSwapping] = useState(false);
    const [sorted, setSorted] = useState(false);
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
                    transition: 'all 100ms ease-in-out',
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
        setIsSwapping(false);
        setSorted(false);
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
         - react expect state to be immutable but objects technically are
         - instead of directly modifying the existing state you should create a
         - new copy of the state with the desired changes and the update the state
         - with a new copy, because react relies on reference equality checks
         - to determine if a components needs re-render
         - //////////////////////////////////////////

         */

        // Deep copy to help prevent unwanted mutation to id state
     const cpy = arr.map( obj => ({...obj}))

        for (let i = 0; i < cpy.length - 1; i++) {
            //stop early if already sorted
            //highlight bars if currently swapping
            setIsSwapping(true);
            let swapped = false;

            for (let j = 0; j < cpy.length - i - 1; j++) {
                if (cpy[j].height > cpy[j + 1].height) {
                    // Create new objects for swap
                    const newCpy = [...cpy];

                    // Swap with new objects
                    //immediately set the offset
                    [newCpy[j], newCpy[j + 1]] = [
                        { ...newCpy[j + 1], offset: newCpy[j].offset },
                        { ...newCpy[j], offset: newCpy[j + 1].offset }
                    ];

                    setHighlightedIds([newCpy[j].id, newCpy[j + 1].id]);

                    // Update state with new array
                    setBarsArr(newCpy);

                    await new Promise(resolve => setTimeout(resolve, 100));
                    setHighlightedIds([]);

                    // Update working copy
                    cpy.splice(j, 2, newCpy[j], newCpy[j + 1]);

                    swapped = true;
                }
            }

            if (!swapped) break;
        }

        setSorted(true);
        setIsSwapping(false);
    };


    const SorterButton = () => {
        return (
            <div
                className="h-10 w-24 bg-emerald-500 text-black flex items-center justify-center cursor-pointer mr-4"
                onClick={async () => {
                    if (!isSwapping && !sorted) {
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

//
//
// import React, { useState, useEffect } from 'react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
//
// interface BarProps {
//     id: number;
//     chars: string;
//     offset: number;
// }
//
// const AsciiBar = ({ id, chars, offset }: BarProps) => {
//     const [highlightedIds, setHighlightedIds] = useState<number[]>([]);
//
//     return (
//         <div
//             className={`
//                 border-2
//                 flex
//                 flex-col
//                 items-end
//                 absolute
//                 transition-all
//                 duration-300
//                 font-mono
//                 bg-white
//                 p-1
//                 ${highlightedIds.includes(id) ? 'border-emerald-400' : 'border-slate-500'}
//             `}
//             style={{
//                 writingMode: 'vertical-lr',
//                 transform: `translateX(${offset}px)`,
//                 transformOrigin: 'bottom right',
//             }}
//         >
//             {chars}
//         </div>
//     );
// };
//
// // Demo component to show the ASCII bars in action
// const AsciiVisualizer = () => {
//     const [bars, setBars] = useState<Array<{ id: number; chars: string; offset: number }>>([]);
//     const [isAnimating, setIsAnimating] = useState(false);
//
//     // Sample ASCII patterns
//     const asciiPatterns = [
//         '█████',
//         '████',
//         '███',
//         '██',
//         '█',
//     ];
//
//     const BAR_WIDTH = 40; // Width of each bar including padding
//     const GAP = 8;      // Gap between bars
//
//     useEffect(() => {
//         generateBars();
//     }, []);
//
//     const generateBars = () => {
//         const newBars = asciiPatterns.map((pattern, index) => ({
//             id: index,
//             chars: pattern,
//             offset: index * (BAR_WIDTH + GAP)
//         }));
//         setBars(newBars);
//         setIsAnimating(false);
//     };
//
//     const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
//
//     const animateBars = async () => {
//         if (isAnimating) return;
//         setIsAnimating(true);
//
//         const newBars = [...bars];
//
//         for (let i = 0; i < newBars.length - 1; i++) {
//             for (let j = 0; j < newBars.length - 1 - i; j++) {
//                 const bar1 = newBars[j];
//                 const bar2 = newBars[j + 1];
//
//                 // Swap positions
//                 const tempOffset = bar1.offset;
//                 bar1.offset = bar2.offset;
//                 bar2.offset = tempOffset;
//
//                 // Update array
//                 [newBars[j], newBars[j + 1]] = [newBars[j + 1], newBars[j]];
//
//                 setBars([...newBars]);
//                 await sleep(500);
//             }
//         }
//
//         setIsAnimating(false);
//     };
//
//     return (
//         <Card className="w-full max-w-2xl">
//             <CardHeader>
//                 <CardTitle>ASCII Bar Visualization</CardTitle>
//             </CardHeader>
//             <CardContent>
//                 <div className="flex flex-col gap-4">
//                     <div className="flex gap-4 justify-center">
//                         <Button
//                             onClick={generateBars}
//                             disabled={isAnimating}
//                             variant="secondary"
//                         >
//                             Reset Bars
//                         </Button>
//                         <Button
//                             onClick={animateBars}
//                             disabled={isAnimating}
//                         >
//                             Animate
//                         </Button>
//                     </div>
//                     <div className="relative h-64 bg-slate-100 p-4 rounded">
//                         {bars.map((bar) => (
//                             <AsciiBar
//                                 key={bar.id}
//                                 id={bar.id}
//                                 chars={bar.chars}
//                                 offset={bar.offset}
//                             />
//                         ))}
//                     </div>
//                 </div>
//             </CardContent>
//         </Card>
//     );
// };
//
// export default AsciiVisualizer;