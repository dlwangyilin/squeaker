import React from "react";
import {Link} from "react-router-dom";

const Homepage = ({currentUser}) => {
    if (!currentUser.isAuthenticated) {
        return (
            <div className="home-hero">
                <h1>What's new?</h1>
                <h4>New to Squeaker?</h4>
                <Link to="/signup" className="btn btn-primary">Sign Up Here </Link>
            </div>
        );
    } else {
        return (
            <div>
                You made it.
            </div>
        );
    }

};

export default Homepage;