const GameOfLife = () => {

    return (
        <section className=" w-full h-52  flex justify-center">
            {
                Array.from({length: 70}, (_, index) => (
                    <div key={index}>
                        {
                            Array.from({length: 12}, (_, index) => (
                                <div key={index} className="h-4 w-4 bg-black border border-gray-500">

                                </div>
                            ))
                        }
                    </div>
                ))
            }
        </section>
    )
}


export default GameOfLife