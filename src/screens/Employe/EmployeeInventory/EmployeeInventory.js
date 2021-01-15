import React from "react";
import "./EmployeeInventory.css";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import {
  Backdrop,
  Button,
  CircularProgress,
  makeStyles,
} from "@material-ui/core";
import { GET } from "./../../../utils/Functions";
import ApiUrls from "./../../../utils/ApiUrls";
function EmployeeInventory(props) {
  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  }));

  const classes = useStyles();
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const handleFetchData = async () => {
    setIsLoading(true);
    let res = await GET(
      ApiUrls.GET_USER_VIEWABLE_INVENTORIES + props.userInfo.id
    );
    console.log(res);
    if (res.success != false) {
      setData(res.data.inventories);
    }
    setIsLoading(false);
  };
  React.useEffect(() => {
    handleFetchData();
  }, []);
  const Table = ({ item, index }) => {
    return (
      <tr>
        <td scope="row">{item.serial_no}</td>
        <td>{item.project.name}</td>
        <td>{item.inventory_category}</td>
        {/* <td>{item.block_name}</td> */}
        <td>{item.block_name}</td>
        <td>{item.property_status}</td>
        {/* <td>{item.block_name}</td> */}
      </tr>
    );
  };
  return (
    <Container fluid className="Laa">
      {isLoading == true ? (
        <>
          <Backdrop className={classes.backdrop} open={true}>
            <CircularProgress disableShrink />
          </Backdrop>
        </>
      ) : null}
      <div className="col-lg-12 shadow p-3 mb-3 bg-white rounded mt-2">
        <h3 style={{ color: "#818181" }}>Inventory (Employee)</h3>
      </div>
      <div className="col-lg-12 shadow p-3  bg-white rounded ">
        <Button variant="outlined">Request Inventory </Button>
        <Row>
          <Col
            lg
            md="12"
            style={{ backgroundColor: "white", borderRadius: "5px" }}
          >
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col" style={{ color: "#818181" }}>
                      Sr No
                    </th>
                    <th scope="col" style={{ color: "#818181" }}>
                      Project
                    </th>
                    <th scope="col" style={{ color: "#818181" }}>
                      Category
                    </th>
                    {/* <th scope="col" style={{ color: "#818181" }}>
                      Type of Unit
                    </th> */}
                    <th scope="col" style={{ color: "#818181" }}>
                      Block
                    </th>
                    <th scope="col" style={{ color: "#818181" }}>
                      Status
                    </th>
                    {/* <th scope="col" style={{ color: "#818181" }}>
                      Viewable To
                    </th> */}
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <Table item={item} index={index} />
                  ))}
                </tbody>
              </table>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

const mapStateToProps = (state) => {
  console.log("state is --------------", state);
  return {
    userInfo: state.auth.user_info,
  };
};

// export default Login;
export default connect(mapStateToProps)(EmployeeInventory);
