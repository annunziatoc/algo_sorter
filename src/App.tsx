import HomePage from "./routes/HomePage.tsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "./routes/Layout.tsx";
import Sorting from "./routes/Sorting.tsx";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/sorting" element={<Sorting/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App




