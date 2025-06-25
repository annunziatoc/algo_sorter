const HomePage = () => {
    return (
        <div className="h-full flex flex-col justify-start items-center bg-gray-800 text-stone-300">
            <div className="w-[450px] flex flex-col gap-4">
                <p>Welcome to my exploration of algorithms and React.</p>
                <p>I built this site to deepen my understanding of frontend web development through interactive visualizations.</p>
                <p>Each demo combines algorithm logic with React components.</p>
                <p>This is very much a learning project, so expect frequent updates as I add new algorithms and improve the
                    existing ones.</p>
                <p>My personal website is accessible <a href="https://chrisannunziato.com/" className="underline">here.</a></p>
                <span> My code is accessible <a href="https://github.com/annunziatoc/algo_sorter" className="underline">here.</a> </span>
            </div>
        </div>
    )
}


export default HomePage