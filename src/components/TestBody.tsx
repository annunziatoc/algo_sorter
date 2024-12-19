import {useState} from "react";

const TestBody = () => {
    const arr = [1, 2]
    const [dist, setDist] = useState(true)

    const swap = () =>{
        setDist((prev) => prev === true ? false : true)
    }


    return (
        <section className="h-full w-full">
            <div className="flex gap-1 items-end">
                <div
                    className="h-10 w-24 bg-emerald-500 text-black flex items-center justify-center cursor-pointer"
                    onClick={swap}>
                    Swap
                </div>

                <div id="main" className="flex relative h-10 ">
                    <div
                        className={`${dist ? `translate-x-0` : `translate-x-11`}  bg-blue-500 absolute transition-all duration-1000 w-10 h-10 flex items-center justify-center`}

                        id="1"
                    >
                        {arr[0]}
                    </div>
                    <div
                        className={`${dist ?  `translate-x-11` : `translate-x-0`}  bg-amber-200 absolute transition-all duration-1000 w-10 h-10 flex items-center justify-center`}

                        id="2"
                    >
                        {arr[1]}
                    </div>
                </div>



            </div>
        </section>
    );
};

export default TestBody