import cl from './App.module.css'
import {Account} from "./pages/Account/Account";
import {Route, Routes} from "react-router-dom";
import {Achievements} from "./pages/Achievements/Achievements";

function App() {
    return (
        <div className={cl.App}>
            <Routes>
                <Route path={'/'} element={<Account/>}/>
                <Route path={'/achiv'} element={<Achievements/>}/>
            </Routes>
        </div>
    );
}

export default App;
