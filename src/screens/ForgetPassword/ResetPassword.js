import {
  Backdrop,
  CircularProgress,
  IconButton,
  Input,
  InputAdornment,
  makeStyles,
  Slide,
  Snackbar,
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { Alert } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import ErrorNotification from "../../components/ErrorNotification";
import SuccessNotification from "../../components/SuccessNotification";
import ApiUrls from "../../utils/ApiUrls";
import { POST } from "../../utils/Functions";
// import { validateLength } from "../../utils/Validation";
import pkgrp from "./../../assests/pakGroup-logo.png";
import { validateEmail,validateLength } from "../../utils/Validation";
// import Footer from "../../../components/SignIn/SignInFooter";
import pakGroup from "./../../assests/pakGroup.jpg";
import "./../Admin/SignIn/SignIn.css";

// import FormDialog from "../../ForgetPassword/ForgetPassword";

const ResetPassword = (props) => {
  const [password, setPassword] = useState("");
  const [ReEnterpassword, setReEnterPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showReEnterPassword, setShowReEnterPassword] = useState(false);

  const [passwordError, setPasswordError] = useState(false);
  const [ReEnterpasswordError, setReEnterPasswordError] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [errorResponce, setErrorResponce] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [IsChecked, setIsChecked] = useState(false);
  const [message, setMessage] = React.useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
      "& .MuiCircularProgress-colorPrimary": {
        color: "#fff",
      },
    },
    input: {
      borderRadius: "30px",
      width: "100%",
    },
  }));

  const classes = useStyles();
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowReEnterPassword = () => {
    setShowReEnterPassword(!showReEnterPassword);
  };
  useEffect(() => {
    if (ReEnterpassword == password) {
      setReEnterPasswordError(false);
    } else {
      setReEnterPasswordError(true);
    }
  }, [ReEnterpassword, password]);
  //   useEffect(() => {
  //     var passwordvalue = localStorage.getItem("rememberPassword");
  //     if (passwordvalue !== "") {
  //       setPassword(passwordvalue);
  //     } else {
  //       setPassword("");
  //     }
  //   }, []);
  const handleClose = () => {
    setShowAlert(false);
  };

  const ResetPassword = async (event) => {
    event.preventDefault();
    let formData = {
        email: email,
      password: password,
      confirm_password:ReEnterpassword,
    };

    let resp = await POST(ApiUrls.POST_UPDATE_PASSWORD, formData);
    console.log("--reset password--",resp)
    if (resp?.error === false) {
      setMessage("password updated Successfully");
      setShowSuccessAlert(true);
       
      } else {
        // ;
        setMessage("Password not updated");
        setShowErrorAlert(true);
      }
  };

  return (
    <Container fluid>
      <div className="row">
        <SuccessNotification
          showSuccess={showSuccessAlert}
          message={message}
          closeSuccess={setShowSuccessAlert}
        />
        <ErrorNotification
          showError={showErrorAlert}
          message={message}
          closeError={setShowErrorAlert}
        />
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
            <img style={{ width: "200px", height: "80px" }} src={pkgrp} />
          </div>

          {/* <Container fluid style={{marginLeft:'30px',marginRight:'300px',border:'1px solid black'}}> */}
          <div
            className="signin-image"
            style={{ marginRight: "30px", marginLeft: "30px" }}
          >
            <img style={{ width: "90%", height: "300px" }} src={pakGroup} />
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
          <div className="login-form ">
            <form
              onSubmit={(e) => {
                ResetPassword(e);
              }}
            >
              <div className="container fluid" style={{ paddingTop: "100px" }}>
                <h2 style={{ color: "#2258BF" }}>Reset Password</h2>
                <h6 style={{ textAlign: "center" }}>
                  Reset your password to Sign in{" "}
                </h6>
                <div
                  className="form-group"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "50px",
                  }}
                >
                     <Input
                  className="form-control  w-100 h-100"
                  style={{ borderRadius: "40px" }}
                  // {true ?  error :null}
                  error={emailError ? true : false}
                  // style={{ borderColor: "red !important" }}
                  placeholder="Enter Email"
                  required="true"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    if (validateEmail(e.target.value)) {
                      // DO Somtin
                      setEmailError(false);
                    } else {
                      // do some
                      setEmailError(true);
                    }
                    setEmail(e.target.value);
                  }}
                />
               
                </div>
                <div>
                {emailError == true ? (
                      <small
                        class="form-text  text-red"
                        style={{ color: "red" }}
                      >
                        *Email should contain "@" and  "." Like (.com or pk.co)
                      </small>
                    ) : null}
                </div>
                <div
                  className="form-group"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                   
                  }}
                >
                  {/* <ClickAwayListener onClickAway={handleClickAway}> */}
                  {/* <div
                      className="form-control input1"
                      id={
                        emailError
                          ? "error"
                          : emailError == false
                          ? "noError"
                          : null
                      }
                    > */}
                  <Input
                    className="form-control  w-100 h-100"
                    style={{ borderRadius: "40px" }}
                    placeholder="Enter password"
                    required="true"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          style={{ outline: "none" }}
                          onClick={handleClickShowPassword}
                        >
                          {showPassword ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    onChange={(e) => {
                      if (validateLength(e.target.value, 8)) {
                        setPasswordError(false);
                      } else {
                        setPasswordError(true);
                      }
                      setPassword(e.target.value);
                    }}
                  />

                  {/* </div> */}
                  {/* </ClickAwayListener> */}
                </div>
                <div>
                  {passwordError ? (
                    <small class="form-text  text-red" style={{ color: "red" }}>
                      Your password must be 8 characters long
                    </small>
                  ) : null}
                </div>
                <div
                  className="form-group"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Input
                    className="form-control  w-100 h-100"
                    style={{ borderRadius: "40px" }}
                    placeholder="Enter Password Again"
                    required="true"
                    type={showReEnterPassword ? "text" : "password"}
                    value={ReEnterpassword}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          style={{ outline: "none" }}
                          onClick={handleClickShowReEnterPassword}
                        >
                          {showReEnterPassword ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    onChange={(e) => {
                      setReEnterPassword(e.target.value);
                    }}
                  />

                  {/* </div> */}
                  {/* </ClickAwayListener> */}
                </div>
                <div>
                  {ReEnterpasswordError ? (
                    <small class="form-text  text-red" style={{ color: "red" }}>
                      password fields must match
                    </small>
                  ) : null}
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
                  <button
                    disabled={ReEnterpasswordError}
                    type="submit"
                    className="btn btn-primary button1 mt-3"
                  >
                    Update
                  </button>
                </div>
                <Link to={{ pathname: "/" }}>
                  <div
                    style={{
                      display: "flex",
                      flex: 1,
                      justifyContent: "center",
                    }}
                  >
                    <p>Go Back to login screen</p>
                  </div>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     OnLoginSuccess: (userData, token) => dispatch(setUser(userData, token)),
//   };
// };

// const mapStateToProps = (state) => {
//   //  ;
// };

// export default Login;
export default ResetPassword;
