import HomePage from "./routes/HomePage.tsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "./routes/Layout.tsx";
import Sorting from "./routes/Sorting.tsx";
import LinkedList from "./routes/LinkedList.tsx";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/sorting" element={<Sorting/>} />
                    <Route path="/linkedlist" element={<LinkedList/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App




