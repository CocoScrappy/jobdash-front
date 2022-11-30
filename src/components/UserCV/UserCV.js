// https://blog.logrocket.com/building-rich-text-editors-in-react-using-draft-js-and-react-draft-wysiwyg/
import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Button, Container, FloatingLabel, Modal } from "react-bootstrap";
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import parse from "html-react-parser";
import { format } from "date-fns";
import "./UserCV.css";
import MyEditor from "components/MyEditor";

function UserCV({ cv, setPageMsg, setPageMsgStyle, setUserCVInfo }) {
  // console.log(cv)
  const [previewCV, setPreviewCV] = useState(false);

  const [convertedContent, setConvertedContent] = useState("");

  const onSubmit = (data) => {
    // setPageMsg("");
    data.content = convertedContent;
    // console.log(convertedContent);
    console.log(data);
    if (data.id === undefined) {
      delete data.id;
      console.log(data);
      axios
        .post(`${process.env.REACT_APP_API_URL}/api/cvs/`, data, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("atoken"),
          },
        })
        .then((response) => {
          console.log("successful");
          console.log(response.data);
          setUserCVInfo(response.data);
          setPageMsg(
            "CV successfully created on " +
              format(new Date(), "MMM dd yyyy h:mmaa")
          );
          setPageMsgStyle("text-success");
        })
        .catch((error) => {
          console.log(error);
          if (error.response) {
            setPageMsg(error.response.data.message);
            setPageMsgStyle("text-danger");
          }
        });
    } else {
      axios
        .patch(`${process.env.REACT_APP_API_URL}/api/cvs/${data.id}/`, data, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("atoken"),
          },
        })
        .then((response) => {
          console.log("successful");
          console.log(response.data);
          setUserCVInfo(response.data);
          setPageMsg(
            "CV successfully edited on " +
              format(new Date(), "MMM dd yyyy h:mmaa")
          );
          setPageMsgStyle("text-success");
        })
        .catch((error) => {
          console.log(error);
          if (error.response) {
            setPageMsg(error.response.data.message);
            setPageMsgStyle("text-danger");
          }
        });
    }
  };

  const resetEditorState = () => {
    console.log("cancel");
    window.location.reload(false);
  };

  const initialValues = {
    id: cv.id,
    name: cv.name,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().max(120).required(),
  });

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        enableReinitialize
      >
        <Form className="m-3">
          <div>
            <Field type="hidden" name="id" className="form-control col-auto" />
          </div>
          <div className="my-3">
            <ErrorMessage
              name="name"
              component="p"
              className="text-danger text-start"
            />
            <FloatingLabel label="CV Name" className="mb-3">
              <Field
                name="name"
                placeholder="CV Name"
                className="form-control col-auto"
              />
            </FloatingLabel>
          </div>
          <div className="mb-3">
            {/* <p className="text-danger">{EditorMsg}</p> */}
            <p className="h5 text-start my-3">Content</p>
            <MyEditor
              content={cv.content}
              setConvertedContent={setConvertedContent}
            />
          </div>
          <div className="d-grid gap-2  col-6 mx-auto">
            <Button type="submit" variant="primary" size="lg">
              Submit
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="lg"
              onClick={() => resetEditorState()}
            >
              Cancel
            </Button>
            <Button variant="info" onClick={() => setPreviewCV(true)}>
              Preview
            </Button>
          </div>
        </Form>
      </Formik>
      {/* <div>{parse(convertedContent)}</div> */}
      <Modal
        // id="modal"
        // fullscreen={true}
        size="lg"
        show={previewCV}
        onHide={() => setPreviewCV(false)}
        // dialogClassName="modal"
        aria-labelledby="cv-preview"
      >
        <Modal.Header closeButton>
          <Modal.Title id="cv-preview">{cv.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{parse(convertedContent)}</Modal.Body>
      </Modal>
    </div>
  );
}

export default UserCV;
