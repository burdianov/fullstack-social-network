import React from "react";
import {Link} from "react-router-dom";

const Menu = () => {
    return (
        <div>
            <Link to="/">Home</Link>
            <Link to="/Signin">Sign In</Link>
            <Link to="/Signup">Sign Up</Link>
        </div>
    )
};

export default Menu;