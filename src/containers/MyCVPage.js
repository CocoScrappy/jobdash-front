import { useState, useEffect } from "react";
import Layout from "components/Layout";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const MyCVPage = () => {
  const [listOfCvs, setListOfCvs] = useState([]);

  const fetchCVs = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/cvs/get_user_cvs/`, {
        headers: {
          email: "johndoes@gmail.ca",
        },
      })
      .then((response) => {
        console.log(response);
        setListOfCvs(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(fetchCVs, []);

  const renderCVs = (listOfCvs) => {
    return (
      <Row>
        {listOfCvs.map((cv, index) => (
          <Col>
            <Card style={{ width: "24rem" }}>
              <Card.Body>
                <Card.Title className="">{cv.name}</Card.Title>
                <Card.Text className="text-truncate">
                  {cv.content}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    );
  };

  return (
    <Layout title="AuthSite | MyCVPage" content="MyCV Page">
      <h1>{renderCVs(listOfCvs)}</h1>
    </Layout>
  );
};
export default MyCVPage;
