import {useEffect, useState} from "react";

const Body = () => {
    const [bars, setBars] = useState<Array<{ height: number; chars: string[]; offset: number; }>>([]);
    const BAR_SPACING = 32 //pixels between each bar

    const SorterButton = () => {
        return (
            <div
                className="h-10 w-24 bg-emerald-500 text-black flex items-center justify-center cursor-pointer mr-4"
                onClick={() => {
                    setBars(prev => bubbleSort(prev));
                }}>
                Sort
            </div>
        )
    }

    useEffect(() => {
        const asciiChars = [
            '@', '#', '&', '$', '%', ')', '(', ']', '[', '}', '{', '*', '=', '+', ':', ';',
            '~', '"', ',', '^', '`', '\'', '-', '/', '\\', '|', '_', '.', '`'
        ];
        // create a 2d array of ascii bars
        // first array is zeros and will be filled with ascii bars of random height
        const newBars = Array(20).fill(0).map((_, index) => {

            const height = Math.floor(Math.random() * 35) + 1;
            //make an array of ascii chars of random length
            const chars = Array.from(
                {length: height},
                () => asciiChars[Math.floor(Math.random() * asciiChars.length)]
            );
            return {height, chars, offset: index * BAR_SPACING};
        });
        setBars(newBars);
    }, []);



    const bubbleSort = (arr: Array<{ height: number; chars: string[]; offset: number; }>) => {
        const n = arr.length;
        const sortedArr = [...arr];

        //outer loop is the number of bars
        for (let i = 0; i < n - 1; i++) {
            //inner loops compares heights and swaps if needed
            for (let j = 0; j < n - i - 1; j++) {

                if (sortedArr[j].height > sortedArr[j + 1].height) {
                    [sortedArr[j], sortedArr[j + 1]] = [sortedArr[j + 1], sortedArr[j]];
                }
            }
        }
        return sortedArr;
    };

//just practicing interfaces no good reason
//but also kind of clean and explicit I think I like it
    interface BarProps {
        height: number;
        chars: string[];
        offset: number;
    }

    const AsciiBar = ({chars, offset}: BarProps) => {
        return (
            <div className="border flex flex-col items-end absolute"
                 style={{
                     writingMode: 'vertical-lr',
                     transform: `translate(${offset}px)`,
                     transformOrigin: 'bottom right',
                 }}>
                {chars}
            </div>
        );
    };


    return (
        //entire screen
        <section className="h-screen w-screen flex justify-start ml-60 items-center ">

            {SorterButton()}

            <div className="flex items-end h-10">
                {bars.map((bar) => (
                    <AsciiBar height={bar.height} chars={bar.chars} offset={bar.offset}/>
                ))}
            </div>

        </section>
    );
};


export default Body;