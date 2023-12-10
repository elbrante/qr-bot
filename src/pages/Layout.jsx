import React from 'react';
import {Outlet} from "react-router-dom";
import cl from '../App.module.css'
import {Footer} from "../components/Footer/Footer";

export const Layout = () => {
    return (
        <main className={cl.App}>
            <Outlet/>
            <Footer/>
        </main>
    );
};

