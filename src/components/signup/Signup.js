import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './SubmitSignup.css';

class Signup extends Component {

    constructor() {
        super();
        this.state = {
          success: false,
          message: ''
        };
    }

    //this is when you submit your signup form
    onSubmit = (event) => {
        event.preventDefault();
        //first get all of the form values and assign them to variables
        let email = this.refs.email.value;
        let password = this.refs.password.value;
        let phone = this.refs.phone.value.toString();
        let company = this.refs.company.value;
        //send a post request with axios to the auth.js file in the routes foolder
        axios.post('/api/auth/signup', {
            email: email,
            password: password,
            phone: phone,
            company: company
        })
          .then((res) => {
            //if there is a response sent back, set the state to true and redirect the users to the login page
            this.setState({success:true});
            this.props.history.push("/login");
        }).catch((err) => {
            console.log(err);
        })
    }

    render() {
        const { success } = this.state;
        
        return (
            <main className="signup">
                <div className="bg pb-5 pt-5">
                    <div className="container">
                    <div className="mt-5 card w-580 mx-auto p-5">
                        <header className="text-center">
                            {/* this is a conditional, if success has a value of true display the first part before the :, else display the second part after the :*/}
                            {success ? <h1 className='mb-4'><i className="ion-checkmark-circled"> </i> &nbsp;<strong>Sign Up success!</strong> </h1>:<h1><i className="ion-clock"> </i>&nbsp;<strong>Sign Up</strong></h1>}

                            {success ? <p>You have successfully signed up!<br/><br/>You'll get an email asking for feedback once the first take is ready. </p>:<p>To get started with Audivity</p>}
                            
                        </header>
                        <section>
                            {/* this attatchs the onSubmit function to the form*/}
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group mt-4 mb-5">
                                    <label htmlFor="signupEmail">Your <strong>email address</strong>.</label>
                                    <input type="email" className="form-control border-top-0 border-left-0 border-right-0"  aria-describedby="emailHelp" placeholder="john@dough.com" name='email' required
                                    ref="email"/>
                                </div>
                                <div className="form-group my-4 mb-5">
                                    <label htmlFor="signupPassword">Your <strong>password.</strong></label>
                                    <input type="password" className="form-control border-top-0 border-left-0 border-right-0"  name='password' placeholder="************" required ref="password" />
                                </div>
                                <div className="form-group my-4 mb-5">
                                    <label htmlFor="signupPhone">Your <strong>phone number.</strong></label>
                                    <input type="text" className="form-control border-top-0 border-left-0 border-right-0"  name='phone' placeholder="520-234-5678" required ref="phone"/>
                                </div>
                                <div className="form-group my-4 mb-5">
                                    <label htmlFor="signupCompany">Your <strong>company.</strong></label>
                                    <input type="text" className="form-control border-top-0 border-left-0 border-right-0"  name='company' placeholder="My Company Name"
                                    required ref="company"/>
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

export default Signup;