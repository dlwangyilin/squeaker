import React from "react";
import {Link} from "react-router-dom";
import MessageTimeline from './MssageTimeline';

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
                <MessageTimeline
                    profileImageUrl={currentUser.user.profileImageUrl}
                    username={currentUser.user.username}/>
            </div>
        );
    }

};

export default Homepage;