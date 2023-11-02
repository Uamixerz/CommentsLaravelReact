import './App.css';
import {Route, Routes} from "react-router-dom";
import DefaultLayout from "./components/container/Default/DefaultLayout";
import HomePage from "./components/container/Home/HomePage";

function App() {
    return (
        <>
            <Routes>
                <Route path='/' element={<DefaultLayout/>}>
                    <Route index element={<HomePage/>}/>
                </Route>
            </Routes>
        </>
    );
}

export default App;
