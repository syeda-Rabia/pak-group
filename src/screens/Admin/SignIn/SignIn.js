import React, { useEffect, useState } from "react";
import ReactDom from "react-dom";
import "./SignIn.css";
import Header_login from "../../../components/SignIn/SignInHeader";
import Footer from "../../../components/SignIn/SignInFooter";
import Image_pak from "./../../../assests/Image_pak.png";
import pkgrp_logo_1 from "./../../../assests/pkgrp_logo_1.png";
import logo from "./../../../assests/Ellipse 2 (1).svg";
import img from "./../../../assests/fb-2.svg";
import img2 from "./../../../assests/tiwtr-2.svg";
import img3 from "./../../../assests/tum-2.svg";
import img4 from "./../../../assests/g-2.svg";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

export default function SignIn(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlePostLogin = async () => {
    // console.log("lofin");
    await fetch("https://pak-group.herokuapp.com/admin/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        let userType = Object.keys(json)[0];
        console.log(userType);
        props.setUser(userType);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Container fluid>
      <div>
        <Header_login />
      </div>
      <div className="row">
        {/* 
              <div className="col-lg-6 col-md-6 mx-5">
        
        */}
        <div
          className="col-lg-7 col-md-6"
          style={{ backgroundColor: "#F7FAFD", border: "1px black" }}
        >
          <div className="first-logo" style={{ height: "119px" }}>
            <img
              style={{ width: "190px", height: "80px" }}
              src={pkgrp_logo_1}
            />
          </div>

          {/* <Container fluid style={{marginLeft:'30px',marginRight:'300px',border:'1px solid black'}}> */}
          <div
            className="signin-image"
            style={{ marginRight: "30px", marginLeft: "30px" }}
          >
            <img style={{ width: "90%", height: "100%" }} src={Image_pak} />
          </div>
          {/* </Container> */}
          <div
            className="row mb-4 px-3 "
            style={{
              paddingTop: "20px",
              marginRight: "30px",
              marginLeft: "30px",
            }}
          >
            <p style={{ textAlign: "center" }}>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
              aspernatur.
            </p>
          </div>
        </div>

        <div className="col-lg-5 col-md-6">
          <div className="login-form">
            <form>
              <h2 style={{ color: "#2258BF" }}>Sign In</h2>

              {/* <div className="row mb-1 "> */}
              {/* <p style={{ textAlign: 'center' }}>
                  Choose one of the following signin methods.
                </p> */}
              {/* </div> */}

              <div className="social-icon ">
                {/* <button type="button" style={{ backgroundColor: 'darkblue' }}>
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
                  </button> */}
              </div>

              {/* <div className="row mb-4  "> */}
              <h6 style={{ textAlign: "center" }}>
                Sign in using your email address{" "}
              </h6>
              {/* </div> */}

              <div className="row  pb-0">
                <div className="container  pb-0 ">
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      placeholder="Username or Email "
                    />
                    <span className="input-icon">
                      <i className="fa fa-envelope"></i>
                    </span>
                  </div>
                  <div className="form-group" style={{}}>
                    <input
                      type="password"
                      name="psw"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                    <span className="input-icon">
                      <i lass="fa fa-lock"></i>
                    </span>
                  </div>
                </div>
              </div>

              <div className="row">
                <div
                  // className="container pb-0"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    // backgroundColor: "red",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      width: "50%",
                      flexDirection: "row",
                      paddingTop: "10px",
                      // justifyContent: "flex-start",
                      // alignItems: "center",
                      // float: "left",
                      // marginLeft: "110px",
                      // border: "1px solid black",
                    }}
                  >
                    {/* <img src={logo} className="pr-2 pb-1" /> */}
                    {/* <div className="chk"> */}
                    <input type="checkbox" id="remember"></input>
                    <label
                      style={{
                        width: "100%",
                        // float: "left",
                        // marginLeft: "",
                      }}
                      for="remember"
                    >
                      Remember me
                    </label>
                  </div>
                  {/* </div> */}

                  <div
                    style={{
                      display: "flex",
                      alignSelf: "flex-start",
                      // backgroundColor: "blue",
                      paddingRight: 100,
                    }}
                  >
                    <a>Forgot Password?</a>
                  </div>
                </div>
              </div>

              {/* <Link to="/admin/dashboard" style={{ color: "white" }}> */}
              <button
                className="login-btn "
                type="submit"
                style={{ backgroundColor: "#2258BF" }}
                onClick={(event) => {
                  event.preventDefault();
                  // handlePostLogin();
                  props.setUser("admin");
                }}
              >
                Login
              </button>
              {/* </Link> */}

              {/* <Link to="/employee/dashboard" style={{ color: "white" }}>
                <button
                  className="login-btn"
                  style={{ backgroundColor: "#2258BF" }}
                  // onClick={() => {
                  //   this.props.setUser("sjkdh");
                  // }}
                >
                  Employee Login
                </button>
              </Link> */}

              <div className="row mb-4 px-5 ">
                <p style={{ textAlign: "center" }}>
                  Don't have an account?
                  <a className="text-primary ">Sign up now!</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </Container>
  );
}
