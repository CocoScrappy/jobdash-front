import React from "react";
import Alert from "react-bootstrap/Alert";

export default function FlashAlert({ setShowAlert, msg, variant }) {
  return (
    <Alert variant={variant} onClose={() => setShowAlert(false)} dismissible>
      {msg}
    </Alert>
  );
}
