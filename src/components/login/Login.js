import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import "./Login.css";

class Login extends Component {

    constructor() {
        super();
        this.state = {
          success: false,
          message: ''
        };
    }
    onSubmit = event => {
        //prevent the page from automatically reloading
        event.preventDefault();
        //get the two values from the form and assign them to variables 
        let email = this.refs.email.value;
        let password = this.refs.password.value;
        //send a post request to auth.js
        axios.post('/api/auth/login', {
            email: email,
            password: password
        })
            .then((res) => {
                //set the jwt token in local storage
                localStorage.setItem('jwtToken', res.data.token);
                //change state
                this.setState({ message: '' });
                //redirect to home
                this.props.history.push('/')
            })
            .catch((error) => {
            if(error.response.status === 401) {
                //change message state to have a string inside
                this.setState({ message: 'Login failed. email or password not match' });
            }
        });
    }

    render() {

    const { message } = this.state;      
        return (
            <main className="login">
                <div className="bg py-5">
                    <div className="container">
                    <div className="mt-5 card w-580 mx-auto p-5">
                        <header className="text-center">
                            <h1><strong>Log In</strong></h1>
                            {/*Users can be redirected on a click to the sign up page if they do not currently have an account*/}
                            <p>Or <Link to="/signup">Sign Up</Link> to continue using Audivity</p>
                        </header>
                        <section>
                            {/*this attatches the onSubmit function to the form*/}
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group mt-4 mb-5">
                                    <label htmlFor="loginEmail">Your <strong>email address</strong>.</label>
                                    <input type="email" className="form-control border-top-0 border-left-0 border-right-0" aria-describedby="loginEmail" placeholder="john@dough.com" name='email' required ref="email"/>
                                </div>
                                <div className="form-group my-4 mb-5">
                                    <label htmlFor="loginPassword">Your <strong>password.</strong></label>
                                    <input type="password" className="form-control border-top-0 border-left-0 border-right-0" placeholder="************" name='password' required ref="password"/>
                                </div>
                                <button className="btn btn-primary text-uppercase px-3 pt-2">Continue &nbsp;<i className="ion-android-arrow-forward"> </i></button>
                            </form>
                        </section>
                    </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default Login;