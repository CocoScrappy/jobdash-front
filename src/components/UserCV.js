import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Button, Container, FloatingLabel } from "react-bootstrap";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import parse from "html-react-parser";

function UserCV({ cv }) {
  let _contentState = ContentState.createFromText(
    "<p><b>Sample content state</b></p>"
  );
  console.log(_contentState)
  const raw = convertToRaw(_contentState);
  console.log(raw)
  const [contentState, setContentState] = useState(parse(_contentState));
  // const [EditorMsg, setEditorMsg] = useState("");
  const [editorState, setEditorState] = useState(() => {
    EditorState.createEmpty();
  });

  const onSubmit = (data) => {
    // setPageMsg("");
    data.content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    console.log(data);
    // axios
    //   .patch(`${process.env.REACT_APP_API_URL}/api/cvs/${data.id}`, data)
    //   .then((response) => {
    //     console.log(response.data);
    //     // setUserCV(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     if (error.response) {
    //       setErrorMsg(error.response.data.message);
    //     }
    //   });
  };

  const initialValues = {
    id: cv.id,
    name: cv.name,
    content: cv.content,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().max(120).required(),
    content: Yup.string().required(),
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
            <Field
              type="hidden"
              name="id"
              placeholder="id"
              className="form-control col-auto"
            />
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
            <Editor
              defaultContentState={contentState}
              //   onContentStateChange={setContentState}
              //   editorState={editorState}
              onEditorStateChange={setEditorState}
              // handleBeforeInput={handleBeforeInput}
              editorStyle={{
                border: "1px solid",
                borderStyle: "groove",
                color: "black",
              }}
            />
          </div>
          <div className="d-grid gap-2">
            <Button type="submit" variant="primary" size="lg">
              Submit
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default UserCV;
