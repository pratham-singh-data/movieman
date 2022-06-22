import React from "react";
import { Link } from "react-router-dom";

const links = [
    {to: "/", text: "Home Page"},
    {to: "/starred", text: "Starred Page"}
]

const Navbar = () => {
    return(
        <div>
            <ul>
                {
                    links.map(item => <li><Link to={item.to}>{item.text}</Link></li>)
                }
            </ul>
        </div>
    )
}

export default Navbar;