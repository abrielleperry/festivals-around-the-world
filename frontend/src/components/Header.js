import React from "react";
import "./Header.css";

const Header = () => {
    return (
        <header className="header">
            <h1>Festival Explorer</h1>
            <nav>
                <ul className="nav-links">
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;