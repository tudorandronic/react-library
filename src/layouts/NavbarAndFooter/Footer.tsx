import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
    return (
        <div className="main-color">
            <div className="container d-flex flex-wrap justify-content-between align-items-center py-3 mb-0 main-color">
                <p className="col-md-4 text-white"> ©Tudor Andronic </p>
                <ul className="nav navbar-dark col-md-4 justify-content-end">
                    <li className="nav-item">
                        <Link to="/home" className="nav-link px-2 text-white"> Home </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/search" className="nav-link px-2 text-white"> Search Books </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}