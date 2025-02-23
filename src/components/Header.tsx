import Logo from "./Logo.tsx";

const Header = () => {
    return (
        <header className="w-screen h-full text-xl bg-black text-stone-400 ">

            <div className="flex  items-center p-2">
                <Logo className="h-10 stroke-gray-400 stroke-2"/>
                <a className="visited:text-white" href="https://chrisannunziato.com">
                    <div className="text-2xl text-stone-400 hover:text-stone-300 cursor-pointer">Chris A.</div></a>
                <div className="flex justify-center items-center pl-40 gap-16">
                    <div className="hover:text-stone-300 cursor-pointer">Sorting</div>
                    <div className="hover:text-stone-300 cursor-pointer">Pathfinding</div>
                    <div className="hover:text-stone-300 cursor-pointer">Binary Search Tree</div>
                </div>
            </div>


        </header>
    )
}


export default Header