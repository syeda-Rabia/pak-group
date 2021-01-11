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
import { POST } from "../../../utils/Functions";
import { connect } from "react-redux";
import { setUser } from "../../../modules/Auth/actions";
import { VisibilityOff, AccountCircle, Visibility } from "@material-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { validateEmail, validateLength } from "../../../utils/Validation";
import {
  FormControl,
  TextField,
  InputAdornment,
  IconButton,
  Input,
  makeStyles,
  FormHelperText,
  Slide,
  Snackbar,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import { Alert, AlertTitle, Skeleton } from "@material-ui/lab";
import { set } from "lodash";

const SignIn = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [errorResponce, setErrorResponce] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  }));

  const classes = useStyles();
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClose = () => {
    setShowAlert(false);
  };

  const SignInFun = async (event) => {
    // loding dstasrt
    event.preventDefault();
    setIsLoading(true);

    console.log("SignInFun is call ------");

    let url = "login";
    let formData = {
      email: email,
      password: password,
    };

    let resp = await POST(url, formData);

    if (resp.data != null) {
      let { user, Access_token } = resp.data;
      props.OnLoginSuccess(user, Access_token);
    } else {
      console.log("resp is sigin in file ----", JSON.stringify(resp));

      try {
        if (resp.error.hasOwnProperty("email")) {
          console.log("-----------------------", resp.error.email[0]);
          setErrorResponce(resp.error.email[0]);
        } else if (resp.error.hasOwnProperty("password")) {
          console.log("-----------------------", resp.error.password[0]);

          setErrorResponce(resp.error.password[0]);
        } else {
          setErrorResponce(resp.error);
        }
        setShowAlert(true);
        setIsLoading(false);
      } catch {
        console.log("error");
      }
    }

    // lodimg false
  };

  return (
    <Container fluid>
      <div className="row">
        {isLoading == true ? (
          <>
            <Backdrop className={classes.backdrop} open={true}>
              <CircularProgress disableShrink />
            </Backdrop>
          </>
        ) : null}
        {showAlert == true ? (
          <Slide in={showAlert} direction="up">
            <Snackbar
              open={showAlert}
              autoHideDuration={2000}
              onClose={handleClose}
              anchorOrigin={{ vertical: "top", horizontal: "left" }}
            >
              <Alert variant="filled" severity="error">
                <AlertTitle>Error</AlertTitle>
                <span className="mr-5" style={{ textAlign: "center" }}>
                  {errorResponce}
                </span>
              </Alert>
            </Snackbar>
          </Slide>
        ) : null}

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
            <form
              onSubmit={(e) => {
                SignInFun(e);
              }}
            >
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
                  {/* <input
                    className="form-control input1"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    placeholder="Username or Email "
                  /> */}
                  {/* Material UI */}
                  <div
                    className="form-control input1"
                    id={emailError ? "error" : null}
                  >
                    <Input
                      disableUnderline="false"
                      fullWidth="true"
                      placeholder="Enter Email"
                      type="email"
                      value={email}
                      endAdornment={
                        <InputAdornment position="end">
                          <div className="emailIcon">
                            <AccountCircle />
                          </div>
                        </InputAdornment>
                      }
                      onChange={(e) => {
                        if (validateEmail(e.target.value)) {
                          setEmailError(false);
                        } else {
                          setEmailError(true);
                        }
                        setEmail(e.target.value);
                      }}
                    />
                    {emailError ? (
                      <FormHelperText id="component-error-text">
                        <span className="mb-5">Enter Valid Email</span>
                      </FormHelperText>
                    ) : null}
                  </div>
                </div>
                <div
                  className="form-group"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* <input
                    className="form-control input1"
                    type="password"
                    name="psw"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  /> */}
                  <div
                    className="form-control input1"
                    id={passwordError ? "error" : null}
                  >
                    <Input
                      id="standard-adornment-password"
                      disableUnderline="false"
                      fullWidth="true"
                      placeholder="Enter Password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        if (validateLength(e.target.value, 8)) {
                          setPasswordError(false);
                        } else {
                          setPasswordError(true);
                        }
                        setPassword(e.target.value);
                      }}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            style={{ outline: "none" }}
                            onClick={handleClickShowPassword}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    {passwordError ? (
                      <FormHelperText id="component-error-text">
                        <span className="mb-5">Min Length 8 Characters</span>
                      </FormHelperText>
                    ) : null}
                  </div>
                </div>
                <div
                  className="flx"
                  style={{
                    // backgroundColor: "red",
                    width: "100%",
                    // height: 50,
                    display: "flex",
                    // paddingRight: 20,
                    // paddingLeft: 30,
                    // flexDirection: "column",
                  }}
                >
                  <div
                    className="custom-control custom-checkbox"
                    style={{
                      display: "flex",
                      flex: 1,
                      // backgroundColor: "blue",
                      // margin: 10,
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
                      // margin: 10,
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
                {/* <Link to="/admin/dashboard" style={{ color: "white" }}> */}
                <div
                  className="form-group"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <button type="submit" className="btn btn-primary button1">
                    Login
                  </button>
                </div>
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
};

const mapDispatchToProps = (dispatch) => {
  return {
    OnLoginSuccess: (userData, token) => dispatch(setUser(userData, token)),
  };
};

const mapStateToProps = (state) => {
  // console.log("state is --------------", JSON.stringify(state));
};

// export default Login;
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
