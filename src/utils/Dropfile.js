import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useDropzone } from "react-dropzone";
import Dialog from "@material-ui/core/Dialog";
import { Box, Button, Paper } from "@material-ui/core";

export default function Dropfile(props) {
  const [toggle, setToggle] = React.useState(false);
  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
  } = useDropzone({
    accept: ".xls  , .xlsx",
  });

  const acceptedFileItems = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path}
      {console.log(file)}
    </li>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
      <ul>
        {errors.map((e) => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));

  return (
    <>
      <button
        className="btn btn-primary "
        style={{ backgroundColor: "#2258BF" }}
        onClick={() => {
          setToggle(!toggle);
          console.log(toggle);
        }}
      >
        <FontAwesomeIcon icon={faFileExcel} />{" "}
        <span className="">Import Excel</span>
      </button>
      {toggle ? (
        <>
          <Dialog
            onClose={() => setToggle(false)}
            aria-labelledby="simple-dialog-title"
            open={toggle}
          >
            <div
              {...getRootProps({
                className: "dropzone  p-5 mx-auto",
              })}
            >
              <input className="w-100" {...getInputProps()} />
              <p>Drag drop files here , or click to select files</p>
              <em>(Only *.xls and *.xlsx Files will be accepted)</em>
            </div>
            <Box display="flex" justifyContent="center">
              <br />
              <h6>Accepted files</h6>
              <ul>{acceptedFileItems}</ul>
              {/* <h4>Rejected files</h4>
        <ul>{fileRejectionItems}</ul> */}
            </Box>
            <Button onClick={() => setToggle(false)}>Done</Button>
          </Dialog>
        </>
      ) : null}
    </>
  );
}
