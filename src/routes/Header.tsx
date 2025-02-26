import Logo from "../components/Logo.tsx";
import {Link} from "react-router-dom";
import React, {useRef} from "react";

const Header = () => {
    const divsRef = useRef<(HTMLDivElement | null)[]>([]);

    const registerMagneticMovement = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        divsRef.current.forEach((div) => {
            if (!div) return;

            const rect = div.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);

            div.style.transform = `rotate(${angle}deg)`;
        });
    }

    const handleMouseLeave = () => {
        divsRef.current.forEach(div => {
            if (!div) return;
            div.style.transform = 'rotate(0deg)';
        });
    }

    return (
        <>
            <header
                className="w-screen h-64 text-xl bg-black text-stone-400
            bg-gradient-to-b from-black to-gray-800 "
                onMouseMove={registerMagneticMovement}
                onMouseLeave={handleMouseLeave}
            >
                <div className="flex items-center p-2">
                    <Logo className="h-10 stroke-gray-400 stroke-2"/>
                    <a href="https://chrisannunziato.com">
                        <div className="text-2xl text-stone-400 hover:text-stone-300 cursor-pointer">Chris A.</div>
                    </a>
                    <div className="flex justify-center items-center pl-40 gap-16">
                        <Link to="/">
                            <div className="hover:text-stone-300 cursor-pointer">Home Page</div>
                        </Link>
                        <Link to="/sorting">
                            <div className="hover:text-stone-300 cursor-pointer">Sorting</div>
                        </Link>
                        <Link to="/pathfinding">
                            <div className="hover:text-stone-300 cursor-pointer">Pathfinding</div>
                        </Link>
                        <Link to="binarysearchtree">
                            <div className="hover:text-stone-300 cursor-pointer">Binary Search Tree</div>
                        </Link>
                    </div>
                </div>

                <div className="flex justify-center items-center gap-4 mt-52">
                    {[...Array(30)].map((_, i) => (
                        <div
                            key={i}
                            ref={(el: HTMLDivElement | null) => {
                                divsRef.current[i] = el
                            }}
                            className="h-1 w-5 bg-green-300 border-2 border-green-300 rounded-full transition-transform duration-75 ease-in-out"
                            style={{transformOrigin: 'center'}}
                        />
                    ))}
                </div>
            </header>
        </>
    );
}


export default Header;