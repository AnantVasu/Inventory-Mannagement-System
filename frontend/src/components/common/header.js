import React from "react";
import { Link } from "react-router-dom";

function Header() {
    return (
        <>
            <nav className="navbar">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2>Menu</h2>
                            <hr className="opacity-100"/>
                            <ul className="navbar-nav">
                                <li className="nav-item"><Link to="/" className="nav-link fs-4">Dashboard</Link></li>
                                <li className="nav-item"><Link to="/products" className="nav-link fs-4">Products</Link></li>
                                <li className="nav-item"><Link to="/locations" className="nav-link fs-4">Locations</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Header;