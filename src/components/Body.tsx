import {useEffect, useState} from "react";

const Body = () => {

    const [bars, setBars] = useState<Array<{height: number, chars: string[]}>>([])

    useEffect(() => {
        const asciiChars = [
            '@', '#', '&', '$', '%', ')', '(', ']', '[', '}', '{','*', '=', '+', ':', ';',
            '~', '"', ',', '^', '`', '\'', '-', '/', '\\', '|', '_', '.', '`'
        ];
        const newBars = Array(20).fill(0).map(() => {
            const height = Math.floor(Math.random() * 35);
            const chars = Array.from(
                { length: height },
                () => asciiChars[Math.floor(Math.random() * asciiChars.length)]
            );
            return { height, chars };
        });
        setBars(newBars);
    }, []);
    return (
        <section className="h-full w-full ">
            <div className="flex gap-1 items-end">
                <div className="h-10 w-24 bg-emerald-500 text-black flex
                items-center justify-center cursor-pointer"
                     onClick={() => {
                         setBars(prev => [...prev.sort((a, b) => a.height - b.height)])
                     }}>Sort
                </div>
                {bars.map((bars, i) =>
                    <AsciiBar key={i} height={bars.height} chars={bars.chars}/>
                )}
            </div>
        </section>
    )
}

interface BarProps {
    height: number;
    chars: string[]
}

const AsciiBar = ({chars}: BarProps) => {
    return (
        <div className=" flex flex-col items-end" style={{writingMode: 'vertical-lr'}}>{chars}</div>
    )
}

export default Body;
