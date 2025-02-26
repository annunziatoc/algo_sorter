import Header from "./Header.tsx";
import {Outlet} from "react-router-dom";

function Layout() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}


export default Layout