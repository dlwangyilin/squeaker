import React, {Component} from "react";

class AuthForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            username: "",
            password: "",
            profileImageUrl: ""
        };
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const authType = this.props.signUp ? "signup" : "signin";
        // 在书签1的位置，这个函数被调用，内部函数完成后，这里的then被传递给1位置的resolve执行
        this.props.onAuth(authType, this.state)
            .then(() => {
                this.props.history.push("/");
            })
            .catch(() => {
                return;
            })
    }

    render() {
        const {email, username, password, profileImageUrl} = this.state;
        const {heading, buttonText, signUp, errors, history, removeError} = this.props;
        history.listen(() => {
            removeError();
        })

        return (
            <div>
                <div className="row justify-content-md-center text-center">
                    <div className="col-md-6">
                        <form onSubmit={this.handleSubmit}>
                            <h2>{heading}</h2>
                            {errors.message &&
                                <div className="alert alert-danger">{errors.message}</div>}
                            <label htmlFor="email">Email:</label>
                            <input
                                className="form-control"
                                id="email"
                                name="email"
                                onChange={this.handleChange}
                                value={email}
                                type="text"/>
                            <label htmlFor="password">Password:</label>
                            <input
                                className="form-control"
                                id="password"
                                name="password"
                                onChange={this.handleChange}
                                type="password"/>
                            {signUp && (
                                <div>
                                    <label htmlFor="username">Username:</label>
                                    <input
                                        className="form-control"
                                        id="username"
                                        name="username"
                                        onChange={this.handleChange}
                                        value={username}
                                        type="text"/>
                                    <label htmlFor="image-url">Image URL:</label>
                                    <input
                                        className="form-control"
                                        id="image-url"
                                        name="profileImageUrl"
                                        onChange={this.handleChange}
                                        value={profileImageUrl}
                                        type="text"/>
                                </div>
                            )}
                            <button type="submit" className="btn btn-primary btn-block btn-lg">
                                {buttonText}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default AuthForm;