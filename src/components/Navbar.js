import React from "react";
import { Link } from "react-router-dom";

const links = [
    {to: "/", text: "Home Page", key:1},
    {to: "/starred", text: "Starred Page", key:2}
]

const Navbar = () => {
    return(
        <div>
            <ul>
                {
                    links.map(item => <li key={item.key}><Link to={item.to}>{item.text}</Link></li>)
                }
            </ul>
        </div>
    )
}

export default Navbar;