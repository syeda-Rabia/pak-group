import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import React, { useCallback } from "react";
import { useDropzone, Dropzone } from "react-dropzone";
import Dialog from "@material-ui/core/Dialog";
import { Box, Button, Paper } from "@material-ui/core";
import * as XLSX from "xlsx";
import { Container } from "react-bootstrap";

export default function Dropfile(props) {
  const [toggle, setToggle] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      // reader.onload = function (e) {
      //   var data = new Uint8Array(e.target.result);
      //   var workbook = XLSX.read(data, { type: "array" });
      //    ;
      //   /* DO SOMETHING WITH workbook HERE */
      // };
      // reader.readAsArrayBuffer(file);

      reader.onload = (evt) => {
        // evt = on_file_select event
        /* Parse data */
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: "binary", cellDates: true });
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
        /* Update state */
        let mappingData = data.slice(1, data.length).map((item) => {
          const obj = new Object();
          if (item.length > 0) {
            data[0].map((val, index) => {
              obj[val] = item[index];
            });
          }
          //  ;

          return obj;
        });
        setSelectedFile((state) => [...state, ...mappingData]);
      };
      reader.readAsBinaryString(file);
    });
  }, []);
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop,
    accept: ".xls  , .xlsx",
  });

  const acceptedFileItems = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path}
      {/* { } */}
    </li>
  ));

  const SendFileToServer = async () => {
    const formData = new FormData();
    // formData.append("file", {
    //   name: "record.aac",
    //   type: "audio/aac",
    //   // uri: `file://${audioPath}`,
    // });
    formData.append("file", selectedFile);
    await fetch("https://webhook.site/f5bf7dff-8327-4e9a-b953-d3aa51cb6b2f", {
      method: "post",
      mode: "no-cors",
      crossDomain: true,
      headers: {
        // "Content-Disposition": "attachment; filename=report.xlsx",
        // Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedFile),
    })
      .then((res) => {
        // return res;
      })
      .catch((error) => {
        console.error(error);
        // return error;
      });
  };

  return (
    <>
      <button
        className="btn btn-primary "
        style={{ backgroundColor: "#2258BF" }}
        onClick={() => {
          setToggle(!toggle);
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
            {/* <div className="dropzone  p-5 mx-auto">
              <input
                type="file"
                name="file"
                onChange={(e) => {
                  setSelectedFile(e.target.files[0]);
                  // SendFileToServer(e);
                  //  ;
                }}
              />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div> */}
            <div className="dropzone  p-5 mx-auto" {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
              <em>(Only *.xls and *.xlsx Files will be accepted)</em>
            </div>
            <br />
            <Container>
              <h6>Accepted files</h6>
              <ul>{acceptedFileItems}</ul>
            </Container>
            {/* <div
            {...getRootProps({
              ,
            })}
          >
            <input
              type="file"
              name="file"
              onChange={(e) => {
                ReadFile(e);

                // setSelectedFile(e.target.files[0]);
                // SendFileToServer(e);
                //  ;
              }}
            />

            {/* <input
              onChange={(e) => {
                // setSelectedFile(ReadFile(e));
                ReadFile(e);

                //  ;
              }}
              className="w-100"
              {...getInputProps()}
            /> */}
            {/* <p>Drag drop files here , or click to select files</p>
            <em>(Only *.xls and *.xlsx Files will be accepted)</em>
          </div> */}{" "}
            {/* */}
            <Box display="flex" justifyContent="center">
              {/* <br />
              <h6>Accepted files</h6>
              <ul>{acceptedFileItems}</ul> */}
              {/* <h4>Rejected files</h4>
      <ul>{fileRejectionItems}</ul> */}
            </Box>
            <Button
              onClick={(e) => {
                SendFileToServer(e);
                setToggle(false);
              }}
            >
              Done
            </Button>
          </Dialog>
        </>
      ) : null}
    </>
  );
}
