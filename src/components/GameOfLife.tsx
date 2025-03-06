import Cell from "./Cell.tsx";

const GameOfLife = () => {

    return (
        <section className=" w-full h-52  flex justify-center">
            {
                Array.from({length: 70}, (_, index) => (
                    <div key={index}>
                        {
                            Array.from({length: 12}, (_, index) => {
                                return (
                                    <div key={index}>
                                        <Cell/>
                                    </div>
                                )
                            })
                        }
                    </div>
                ))
            }
        </section>
    )
}


export default GameOfLife