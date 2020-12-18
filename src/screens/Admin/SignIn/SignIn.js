import React, { Component } from 'react';
import ReactDom from 'react-dom';
import './SignIn.css';
import Header_login from '../../../components/SignIn/SignInHeader';
import Footer from '../../../components/SignIn/SignInFooter';
import Image_pak from './../../../assests/Image_pak.png';
import pkgrp_logo_1 from './../../../assests/pkgrp_logo_1.png';
import logo from "./../../../assests/Ellipse 2 (1).svg";
import img from './../../../assests/fb-2.svg';
import img2 from './../../../assests/tiwtr-2.svg';
import img3 from './../../../assests/tum-2.svg';
import img4 from './../../../assests/g-2.svg';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
class SignIn extends Component {
  render() {
    return (
      <Container fluid>
        <div>
          <Header_login />
        </div>
        <div class="row">
          {/* 
              <div class="col-lg-6 col-md-6 mx-5">
        
        */}
          <div
            className="col-lg-7 col-md-6"
            style={{ backgroundColor: '#F7FAFD', border: '1px black' }}
          >
            <div className="first-logo" style={{ height: '119px' }}>
              <img
                style={{ width: '190px', height: '80px' }}
                src={pkgrp_logo_1}
              />
            </div>

            {/* <Container fluid style={{marginLeft:'30px',marginRight:'300px',border:'1px solid black'}}> */}
            <div
              className="signin-image"
              style={{ marginRight: '30px', marginLeft: '30px' }}
            >
              <img style={{ width: '90%', height: '100%' }} src={Image_pak} />
            </div>
            {/* </Container> */}
            <div
              class="row mb-4 px-3 "
              style={{
                paddingTop: '20px',
                marginRight: '30px',
                marginLeft: '30px',
              }}
            >
              <p style={{ textAlign: 'center' }}>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur.
              </p>
            </div>
          </div>

          <div class="col-lg-5 col-md-6">
            <div class="login-form">
              <form>
                <h2>Sign In</h2>

                {/* <div class="row mb-1 "> */}
                <p style={{ textAlign: 'center' }}>
                  Choose one of the following signin methods.
                </p>
                {/* </div> */}

                <div class="social-icon ">
                  <button type="button" style={{ backgroundColor: 'darkblue' }}>
                    <img src={img} className="mr-1 mb-1" />
                    Facebook
                  </button>
                  <button type="button" style={{ backgroundColor: '#55ACEE' }}>
                    <img src={img2} className="mr-1 mb-1" />
                    Twitter
                  </button>
                  <button type="button" style={{ backgroundColor: '#3B445C' }}>
                    <img src={img3} className="mr-1 mb-1" />
                    Tumblr
                  </button>
                  <button type="button" style={{ backgroundColor: '#EA4B24' }}>
                    <img src={img4} className="mr-1 mb-1" />
                    Google
                  </button>
                </div>

                {/* <div class="row mb-4  "> */}
                <p style={{ textAlign: 'center' }}>
                  or signin using your email address{' '}
                </p>
                {/* </div> */}

                <div class="row ">
                  <div class="container ">
                    <div class="form-group">
                      <input
                        type="email"
                        name="email"
                        placeholder="Username or Email "
                      />
                      <span class="input-icon">
                        <i class="fa fa-envelope"></i>
                      </span>
                    </div>
                    <div class="form-group" style={{}}>
                      <input
                        type="password"
                        name="psw"
                        placeholder="Password"
                      />
                      <span class="input-icon">
                        <i lass="fa fa-lock"></i>
                      </span>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="container">
                    <div style={{ float: 'left', marginLeft: '110px' }}>
                      <img src={logo} className="pr-2 pb-1" />

                      <label>Remember me</label>
                    </div>

                    <div style={{ float: 'right', marginRight: '100px' }}>
                      <a href="#">Forgot Password?</a>
                    </div>
                  </div>
                </div>

                <button class="login-btn">Login</button>
                <div class="row mb-4 px-5 ">
                  <p style={{ textAlign: 'center' }}>
                    {' '}
                    Don't have an account?{' '}
                    <a href="#" className="text-primary ">
                      Sign up now!
                    </a>
                  </p>
                </div>
              </form>
              <Link to="/dashboard">Login</Link>
            </div>
          </div>
        </div>
        <div>
          <Footer />
        </div>
      </Container>
    );
  }
}
export default SignIn;
