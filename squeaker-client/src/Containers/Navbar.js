import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import Logo from "../images/warbler-logo.png";
import {logout} from "../store/actions/auth";

class Navbar extends Component{

    logout = (event) => {
        event.preventDefault();
        this.props.logout();
    }

    render() {
        let authenticated = null;
        if (this.props.currentUser.isAuthenticated) {
            authenticated = (
                <ul className="nav navbar-nav navbar-right">
                    <li>
                        <Link to={`/users/${this.props.currentUser.user.id}/messages/new`}>
                            New Message
                        </Link>
                    </li>
                    <li>
                        <a onClick={this.logout}>Log out</a>
                    </li>
                </ul>
            );
        } else {
            authenticated = (
                <ul className="nav navbar-nav navbar-right">
                    <li>
                        <Link to="/signup">Sign Up</Link>
                    </li>
                    <li>
                        <Link to="/signin">Log In</Link>
                    </li>
                </ul>
            );
        }
        return(
            <nav className="navbar navbar-expand">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link to="/" className='navbar-brand'>
                            <img src={Logo} alt="Squeaker Home"/>
                        </Link>
                    </div>
                    {authenticated}
                </div>
            </nav>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser
    };
}
export default connect(mapStateToProps, {logout})(Navbar);