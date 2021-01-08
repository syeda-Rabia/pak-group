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
            className="row mb-4 px-3 content"
            style={{
              paddingTop: "20px",
              marginRight: "30px",
              marginLeft: "30px",
            }}
          >
            <p className="content">
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
              <div className="container fluid">
                <h2>Sign In</h2>
                <h6 style={{ textAlign: "center" }}>
                  Sign in using your email address{" "}
                </h6>{" "}
                <div
                  className="form-group"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "50px",
                  }}
                >
                  <input
                    className="form-control input1"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    placeholder="Username or Email "
                  />
                </div>
                <div
                  className="form-group "
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <input
                    className="form-control input1"
                    type="password"
                    name="psw"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
                <div
                  className="flx"
                  style={{
                    // backgroundColor: "red",
                    width: "100%",
                    // height: 50,
                    display: "flex",
                    paddingRight: 20,
                    paddingLeft: 30,
                    // flexDirection: "column",
                  }}
                >
                  <div
                    className="custom-control custom-checkbox"
                    style={{
                      display: "flex",
                      flex: 1,
                      // backgroundColor: "blue",
                      margin: 10,
                      justifyContent: "center",
                    }}
                  >
                    <input
                      style={{
                        borderRadius: "20px",
                      }}
                      type="checkbox"
                      className="custom-control-input"
                      id="customCheck1"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheck1"
                    >
                      Remember me
                    </label>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flex: 1,

                      // backgroundColor: "blue",
                      margin: 10,
                      justifyContent: "center",
                    }}
                  >
                    <p
                    // style={{
                    //   display: "flex",
                    //   alignSelf: "flex-end",
                    // }}
                    >
                      <a href="#"> Forgot password?</a>
                    </p>
                  </div>
                </div>
                <Link to="/admin/dashboard" style={{ color: "white" }}>
                  <div
                    className="form-group"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <button
                      type="submit"
                      className="btn btn-primary button1"
                      onClick={() => {
                        props.setUser("admin");
                      }}
                    >
                      Admin Login
                    </button>
                  </div>
                </Link>
                <Link to="/employee/dashboard" style={{ color: "white" }}>
                  <div
                    className="form-group"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <button
                      type="submit"
                      className="btn btn-primary button1"
                      onClick={() => {
                        props.setUser("employee");
                      }}
                    >
                      Employee login
                    </button>
                  </div>
                </Link>
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
