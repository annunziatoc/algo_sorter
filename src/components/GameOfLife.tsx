import Cell from "./Cell.tsx";

const GameOfLife = () => {

    const generation = Array.from({length: 70}, (_, index) => (
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

    return (
        <section className=" w-full h-52  flex justify-center">
            {
                [...generation]
            }
        </section>
    )
}


export default GameOfLife