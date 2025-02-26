import Main from "./routes/Main.tsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "./routes/Layout.tsx";
import Sorting from "./routes/Sorting.tsx";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Main/>}/>
                    <Route path="/sorting" element={<Sorting/>} />
                    <Route path="/pathfinding" element={<Main/>} />
                    <Route path="/binarysearchtree" element={<Main/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App




