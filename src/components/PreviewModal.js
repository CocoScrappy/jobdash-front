import { Modal } from "react-bootstrap";
import parse from "html-react-parser";

function PreviewModal(props) {
  return (
    <Modal
      size="lg"
      show={props.show}
      onHide={() => props.setShow(false)}
      aria-labelledby="cv-preview"
    >
      <Modal.Header closeButton>
        <Modal.Title id="cv-preview">{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{parse(props.content)}</Modal.Body>
    </Modal>
  );
}
export default PreviewModal;
