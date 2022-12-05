import React from "react";
import Alert from "react-bootstrap/Alert";

export default function FlashAlert({ setShowAlert, msg }) {
  return (
    <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
      <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
      <p>{msg}</p>
    </Alert>
  );
}
