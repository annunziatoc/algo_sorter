const Body = () => {
    const arr = [];
    for (let i = 0; i < 65; i++) {
        arr.push(<Bar key={i}/>);
    }

    return (
        <section className="border h-full w-full ">
            <div className="flex gap-1 items-end">

                {arr}

            </div>
        </section>
    )
}

const Bar = () => {
    const randInt = Math.floor(Math.random() * 250)
    const minHeight = 10
    const height = `${minHeight + randInt}px`

    return (
        <div className="rounded-sm w-[6px] h-96 bg-blue-500 "
             style={{ height: height }}>
        </div>
    )
}


export default Body