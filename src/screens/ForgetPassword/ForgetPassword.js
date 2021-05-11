import React ,{ useEffect, useState }from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Input } from "@material-ui/core";
import { validateEmail,validateLength } from "../../utils/Validation";
import ApiUrls from "../../utils/ApiUrls";
import { GET, POST } from "../../utils/Functions";
import SuccessNotification from "../../components/SuccessNotification";
import ErrorNotification from "../../components/ErrorNotification";


export default function FormDialog({ show, close }) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [message, setMessage] = React.useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const sendEmail = async (event) => {
    event.preventDefault();
    let formData = {
     
      email: email,
     
    };
  
    let resp = await POST(ApiUrls.POST_PASSWORD_RESET_EMAIL, formData);
    // console.log("---------email----",resp)
    if (resp?.error === false) {
      setMessage("Email sent");
      setShowSuccessAlert(true);
       
      } else {
        // ;
        setMessage("Email not sent");
        setShowErrorAlert(true);
      }

   
  };

  
  return (
    <div>
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

      <Dialog
        open={show}
        onClose={() => {
          close(false);
        }}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Forget Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please Enter your Email to reset your password.
          </DialogContentText>
          <Input
                  className="form-control  w-100"
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
                {emailError == true ? (
                      <small
                        className="form-text  text-red"
                        style={{ color: "red" }}
                      >
                        *Email should contain "@" and  "." Like (.com or pk.co)
                      </small>
                    ) : null}
          {/* <Input
            autoFocus
            required
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          /> */}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              close(false);
            }}
            color="primary"
          >
            Cancel
          </Button>
          <Button
          disabled={emailError}
            type="submit"
            onClick={(e) => {
              sendEmail(e);
              close(false);

            }}
            color="primary" 
          >
          Send Email
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
