import React, { Component } from 'react';
import "./SubmitArticle.css";
import UrlForm from './UrlForm'
import axios from 'axios';
import { Redirect } from "react-router-dom";

class SubmitArticle extends Component {

    state = {
        redirect: false,
        sent: false,
        step: 'step1',
        url: '/submitEmail/'
    }

    constructor(props) {
        super(props);
        this.url = null;
        this.requestID = null;
    }

    changeStep = (step) => {
        console.log("STEP CALLED", step);
        this.setState({ step: step })
    }

    submit = values => {
        // print the form values to the console
        console.log(values);
        var that = this;
        that.setState({ sent: true })
        // Send rest request	
        // Changed https to http. Form was throwing network error
        //axios request is handled in the php code
        // axios.post('http://api2.audivity.com/user/url', {
        //     url: values.url,
        //     gender: values.gender,
        //     age: values.age,
        //     industry: values.industry
        // })
        //     .then(function (response) {
        //         console.log(response);
        //         //save ReqID
        //         that.requestID = response.data.key;
        //         //redirect to send_email view
        //         that.state.url += that.requestID
        //         that.setState({ redirect: true })


        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });

    }

    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to={this.state.url} />;
        }

        return (
            <main className="SubmitArticle">
                <div className="stepper-container">
                    <div className="lbl">HEAD</div>
                    <div className="lbl">FOOTER</div>
                    <div className={this.state.step}>
                        <ul className="stepper">
                            <li><span>Picking article url...</span></li>
                            <li><span>Picking voice actor...</span></li>
                            <li><span>Picking email...</span></li>
                        </ul>
                    </div>
                </div>
                <section className="jumbotron mb-0">
                    <div className="container py-5">
                        <br />
                        <br />
                        <br />
                        <br />
                        {this.state.sent ? <h1 className="display-5 mb-0 success"><i class="ion-clock"> </i> Thanks for your submission  <span>We're getting started on your fresh auditions!</span></h1> : null}

                        {!this.state.sent ? <div>
                            <h1 className="display-5 mb-0">Hi, Welcome to <br />Audivity! <span>beta</span></h1>

                            <h2 className="my-3" id="typed">
                                <div className="display-4">Submit a URL of your blog to receive professionally narrated samples free </div>
                            </h2>

                            <div className="h-100 mt-4">
                                <UrlForm onSubmit={this.submit} changeStep={this.changeStep} />
                            </div>
                        </div>: null}

                    </div>
                </section>


                {/* {<section className="bg-light pb-4">
                    <div className="container py-5">


                        <header className="text-center w-720 mx-auto pt-4">
                            <h2 className="mb-4">Shipping in 2018</h2>
                            <p className="team-p mb-5">Calling all creators, makers and hackers. Sign up and be the first to know about partnerships, promotions and when Audivity is available.</p>




                        </header>



                        <form className="mx-auto w-440">

                            <div className="form-group mb-5 mt-4">
                                <label htmlFor="nameInput" className="black-label">Your <strong>name.</strong></label>
                                <input type="text" className="bg-light form-control border-top-0 border-left-0 border-right-0" id="nameInput" placeholder="Jon Dough" />
                            </div>

                            <div className="form-group mb-5">
                                <label htmlFor="emailInput" className="black-label">Your <strong>email address</strong>.</label>
                                <input type="email" className="bg-light form-control border-top-0 border-left-0 border-right-0" id="emailInput" aria-describedby="emailHelp" placeholder="jon@dough.com" />
                            </div>

                            <div className="form-group mb-5">
                                <label htmlFor="aboutInput" className="black-label">Tell us about <strong>yourself</strong>.</label>

                                <select className="custom-select bg-light border-top-0 border-left-0 border-right-0" id="aboutInput">
                                    <option defaultValue>Choose...</option>
                                    <option value="1">Content Creator</option>
                                    <option value="2">Developer</option>
                                    <option value="3">Audio Specialist</option>
                                    <option value="3">Investor</option>
                                    <option value="3">Audivity Enthusiast</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary text-uppercase px-3 pt-2">Stay Connected&nbsp;<i className="ion-android-arrow-forward"> </i></button>
                        </form>


                    </div>
                </section>} */}

            </main>
        );
    }
}

export default SubmitArticle;