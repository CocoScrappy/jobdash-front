import React, { Component, useState, useEffect } from "react";

function ApplicationListing(props) {
  const [listOfJobApplications, setListOfJobApplications] = useState([]);

  const fetchUserApplications = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/cvs/get_user_applications/`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("atoken"),
        },
      })
      .then((response) => {
        console.log(response);
        setListOfJobApplications(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(fetchUserApplications, []);

  return (
    <div>
        {listOfJobApplications.map((application, index) => {
            {listOfJobApplications.map((cv, index) => (
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
        })}
    </div>
  )
}
