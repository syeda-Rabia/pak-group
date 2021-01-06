import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useDropzone } from "react-dropzone";
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
    <section >
      <button
        className="btn btn-primary "
        style={{backgroundColor:"#2258BF"}}
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
          <div
            {...getRootProps({
              className: "dropzone border border-dark rounded p-3 mx-auto",
            })}
          >
            <input {...getInputProps()} />
            <p>Drag drop files here , or click to select files</p>
            <em>(Only *.xls and *.xlsx images will be accepted)</em>
          </div>
          <aside>
            <br />
            <h6>Accepted files</h6>
            <ul>{acceptedFileItems}</ul>
            {/* <h4>Rejected files</h4>
        <ul>{fileRejectionItems}</ul> */}
          </aside>
        </>
      ) : null}
    </section>
  );
}
