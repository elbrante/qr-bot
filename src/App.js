import cl from './App.module.css'
import {Account} from "./pages/Account/Account";
import {Route, Routes} from "react-router-dom";

function App() {
    return (
        <div className={cl.App}>
            <Routes>
                <Route path={'/'} element={<Account/>}/>
            </Routes>
        </div>
    );
}

export default App;
