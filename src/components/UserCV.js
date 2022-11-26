import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Button, Container, FloatingLabel } from "react-bootstrap";
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
import MyEditor from "components/MyEditor";
import { format } from 'date-fns'

function UserCV({ cv, setPageMsg, setPageMsgStyle, setUserCVInfo }) {
//   const sampleMarkup = `
//     <div>
//       <h2>Title</h2>
//     <i>some text</i>
//   </div>
// `;

const sampleMarkup = cv.content;

  const blocksFromHTML = convertFromHTML(sampleMarkup);
  const state = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  );

  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(state)
  );

  // ---------------------------------------------
//   const [editorState, setEditorState] = useState(() =>
//     EditorState.createEmpty()
//   );

  const [convertedContent, setConvertedContent] = useState("");

  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  };

  const convertContentToHTML = () => {
    let currentContentAsHTML = draftToHtml(
      convertToRaw(editorState.getCurrentContent())
    );
    setConvertedContent(currentContentAsHTML);
  };

  const onSubmit = (data) => {
    // setPageMsg("");
    data.content = convertedContent;
    // console.log(convertedContent);
    console.log(data);
    axios
      .patch(`${process.env.REACT_APP_API_URL}/api/cvs/${data.id}/`, data)
      .then((response) => {
        console.log(response.data);
        setUserCVInfo(response.data);
        setPageMsg("CV successfully edited on " + format(new Date(),"MMM dd yyyy h:mmaa"));
        setPageMsgStyle("text-success");
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          setPageMsg(error.response.data.message);
          setPageMsgStyle("text-danger")
        }
      });
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
            <MyEditor
              content={cv.content}
              editorState={editorState}
              onEditorStateChange={setEditorState}
            />
            <Editor
              editorState={editorState}
              onEditorStateChange={handleEditorChange}
              wrapperClassName="wrapper-class"
              editorClassName="editor-class"
              toolbarClassName="toolbar-class"
            />
          </div>
          <div className="d-grid gap-2">
            <Button type="submit" variant="primary" size="lg">
              Submit
            </Button>
          </div>
        </Form>
      </Formik>
      <div>{parse(convertedContent)}</div>
    </div>
  );
}

export default UserCV;
