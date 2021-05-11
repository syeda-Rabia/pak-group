import { makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "react-phone-number-input/style.css";
import { useHistory } from "react-router-dom";
import PreLoading from "../../../components/PreLoading";
import ApiUrls from "./../../../utils/ApiUrls";
import { GET } from "./../../../utils/Functions";
import "./../../Admin/Leads/LeadsAdmin.css";
import Pagination from "../../../components/Pagination/Pagination";
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
    "& .MuiCircularProgress-colorPrimary": {
      color: "#fff",
    },
  },
}));
export default function EmployeeReport() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

 
  const [showView, setShowView]= useState(false);
  const [data, setData] = useState([]);
  // const [data, setData] = useState([]);
  const [selectedID, setSelectedID] = useState(0);
  const [message, setMessage] = React.useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);


  /*  Pagination data  */

  const [pageSize, setPageSize] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [pageCount, setPageCount] = React.useState(0);
  const [totalRecord, setTotalRecord] = React.useState(0);

  const lastIndex = currentPage * pageSize;
  const istIndex = lastIndex - pageSize;
  
  // const [page, setPage] = React.useState(2);
  const handlePageChange = async (page) => {
    /*
     Api Call
     
     */
    setIsLoading(true);
    let resp = await GET(ApiUrls.GET_EMPLOYEE_LEAD_REPORT_DATA + page);

    if (resp?.employeesReport != null) {
      setCurrentPage(resp?.employeesReport?.current_page);
      setData(resp?.employeesReport?.data);
    }
    setIsLoading(false);
  };

  const handleShow = (pageCount) => {
    setPageCount(pageCount);
  };

  /*  Pagination data  */

  const handleFetchData = async () => {
    setIsLoading(true);
    let res = await GET(ApiUrls.GET_EMPLOYEE_LEAD_REPORT_DATA);
    // console.log("ress0", res);
    if (res?.success != false) {
      setData(res?.employeesReport?.data);
      setPageSize(res?.employeesReport?.per_page);
      setTotalRecord(res?.employeesReport?.total);
      setCurrentPage(res?.employeesReport?.current_page);
    
    }
    setIsLoading(false);
  };
  // React.useEffect(() => {
  //   handleFetchData();
  // }, []);
  useEffect(() => {
    handleFetchData();
  }, [refresh]);
  const history = useHistory();

 

 
  
  const Table = ({ item, index }) => {
    //  ;
    return (
      <tr>
        
        <td key={index + 1+"table"}>{index+1}</td>
        <td >{item.empName}</td>
        <td >{item.instructions}</td>
        <td >{item.call_expainations}</td>
        <td >{item.shifted_leads}</td>
     
       
      </tr>
    );
  };
  return (
    <Container fluid className="Laa">
      <PreLoading startLoading={isLoading} />

    
      
        <Row className=" shadow p-3 mb-3 bg-white rounded mt-4 ">
       
        <Col lg={10} sm={10} xs={10} xl={11}>
          <h3 style={{ color: "#818181" }}>Employee Lead Report</h3>
        </Col>
        </Row>
     
      
        <Row className=" shadow p-3  bg-white rounded mb-4">
         
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col" style={{ color: "#818181" }}>
                    ID
                  </th>

                  <th scope="col" style={{ color: "#818181" }}>
                Employee Name
                  </th>
                  <th scope="col" style={{ color: "#818181" }}>
                    No of instructions
                  </th>
                  <th scope="col" style={{ color: "#818181" }}>
                    Call Explanation
                  </th>
                  <th scope="col" style={{ color: "#818181" }}>
                    Shifted Leads
                  </th>
                </tr>
              </thead>
              <tbody>
                
                {/* {data
                 
                  .map((item, index) => {
                    return <Table item={item} index={index} />;
                  })} */}
                  {data?.map((item, index) => {
                  return <Table index={index} item={item} />;
                })}
              </tbody>
             
            </table>
           
          </div>
          <Col>
       
          {pageCount>1?(
 <p className="page-info">
 Showing {currentPage} from {pageCount}
</p>
          ):null
         
          }
            
        </Col>
        <Col>
       

 <Pagination
 itemsCount={totalRecord}
 pageSize={pageSize}
 currentPage={currentPage}
 onPageChange={handlePageChange}
 show={handleShow}
/>

         
       
       
        </Col>
      </Row>
    </Container>
  );
}
