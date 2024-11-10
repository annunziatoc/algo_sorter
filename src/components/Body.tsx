import {useEffect, useState} from "react";

const Body = () => {

    const [heights, setHeights] = useState<number[]>([]);

    useEffect(() => {
        const newHeights = Array(65).fill(0).map(
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

                    setHeights(prev => [...prev.sort((a,b) => a -b)])


                    return heights
                }}>Sort</div>
                {heights.map((height, i) => <Bar key={i} height={height}/>)}
            </div>
        </section>
    )
}

interface BarProps {
    height: number;
}

const Bar = ({height}: BarProps) => {
    return (
        <div className="rounded-sm w-[6px] h-96 bg-blue-500 "
             style={{height: `${height}px`}}>
        </div>
    )
}


export default Body ;