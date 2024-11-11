import {useEffect, useState} from "react";

const Body = () => {

    const [heights, setHeights] = useState<number[]>([]);

    useEffect(() => {
        const newHeights = Array(20).fill(0).map(
            () => Math.floor(Math.random() * 250) + 10
        );
        setHeights(newHeights);
    }, []);

    return (
        <section className="h-full w-full ">
            <div className="flex gap-1 items-end">
                <div className="h-10 w-24 bg-emerald-500 text-black flex
                items-center justify-center cursor-pointer"
                     onClick={() => {

                         setHeights(prev => [...prev.sort((a, b) => a - b)])


                         return heights
                     }}>Sort
                </div>
                {heights.map((height, i) =>
                    // <Bar key={i} height={height}/>
                    <AsciiBar key={i} height={height}/>
                )}
            </div>
        </section>
    )
}

interface BarProps {
    height: number;
}

// const Bar = ({height}: BarProps) => {
//     return (
//         <div className="rounded-sm w-[6px] h-96 bg-blue-500 "
//              style={{height: `${height}px`}}>
//         </div>
//     )
// }

const AsciiBar = ({height}: BarProps) => {
    // const asciiChars = [
    //     // Block Elements
    //     '█', '▀', '▄', '▌', '▐', '░', '▒', '▓', '■', '▯', '▮', '▭', '▬', '▫', '▪', '□', '▢', '▦', '▩',
    //
    //     // Box Drawing
    //     '│', '┤', '╡', '╢', '╖', '╕', '╣', '║', '╗', '╝', '╜', '╛', '┐', '└', '┴', '┬', '├', '─', '┼', '╞',
    //     '╟', '╚', '╔', '╩', '╦', '╠', '═', '╬', '╧', '╨', '╤', '╥', '╙', '╘', '╒', '╓', '╫', '╪', '┌', '┘',
    //     '┗', '┛', '┏', '┓', '┳', '┫', '┣', '┃', '━', '┻', '┥', '┝', '┯', '┷', '┿', '┡', '┢', '┩', '┪', '┱',
    //     '┲', '┹', '┺', '┭', '┮', '┵', '┶', '┸', '┰', '┠', '┨', '┯', '┷', '┞', '┟', '┡', '┢', '┦', '┧', '┩',
    //     '┪', '┱', '┲', '┵', '┶', '┸', '┹', '┺',
    //
    //     // Dense ASCII
    //     '@', '#', '&', '$', '%', 'W', 'M', 'B', '8', 'R', 'D', 'Q', 'H', 'N', 'U', 'A', 'K', 'G', 'E',
    //
    //     // Medium Density
    //     '0', '9', '6', 'P', 'q', 'd', 'b', 'k', 'h', 'w', 'm', 'Z', 'O', 'S', 'X', 'V', 'Y', 'T', 'L',
    //     'l', 'I', '5', 'F', 'C',
    //
    //     // Light Characters
    //     '4', '2', '3', 'e', 'a', 'o', 'g', 'p', '&', 'x', 'v', 'c', 'z', 'n', 'u', 't', 'f', 'r', 'j',
    //     'y', '7', ')', '(', ']', '[', '}', '{',
    //
    //     // Very Light
    //     '*', '=', '+', ':', ';', '~', '"', ',', '^', '`', '\'', '-', '/', '\\', '|', '_',
    //
    //     // Minimal
    //     '.', '`', ' '
    // ];

    // const symArr = Array.from({length: height}, () => 0)
    return (
        <div className="rounded-sm w-[24px] h-96 bg-blue-500 flex flex-col "
             style={{height: `${height}px`}}>
            <div className="h-full" style={{ writingMode: 'vertical-lr'}}>Hello World</div>
        </div>
    )
}

export default Body;
