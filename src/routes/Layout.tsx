import Header from "./Header.tsx";
import {Outlet} from "react-router-dom";

function Layout() {
    return (
        <div className="h-screen flex flex-col">
            <Header />
            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    )
}


export default Layout