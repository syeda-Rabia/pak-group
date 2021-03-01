// import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { GET, POST } from "../../../utils/ExcelPage";
import ApiUrls from "../../../utils/ApiUrls";
import React, { useEffect, useState } from "react";

export default function EmployeePolicies() {
  const [title, SetTitle]=useState("");
  const [description, SetDescription]=useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    // setIsLoading(true);
    getPolicies();
   
  }, []);
  const getPolicies = async () => {
    

    // let resp = await GET(ApiUrls.GET_ALL_LEADS);

    // if (resp.data != null) {
    //   setAllLeads(resp.data.leads);
    // }
    setIsLoading(false);

    
  };
  return (
    <Container fluid>
      <div className="col-lg-12 shadow p-3 mb-3 bg-white rounded mt-2">
        <h3 style={{ color: "#818181" }}>Policies</h3>
      </div>
      <div className="col-lg-12 shadow p-3  bg-white rounded ">
      {/* <div  className="p-3" dangerouslySetInnerHTML={{__html: item.Description}} /> */}
        <h6 style={{ color: "#2258BF" }}>Introduction</h6>
        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
          aspernatur.
        </p>
        <h6 style={{ color: "#2258BF" }}>Using our service</h6>
        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
          aspernatur.
        </p>
        <h6 style={{ color: "#2258BF" }}>Privacy and copyright protection</h6>
        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
          aspernatur.
        </p>
        <h6 style={{ color: "#2258BF" }}>Your content in our services</h6>
        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
          aspernatur.
        </p>
      </div>
    </Container>
  );
};