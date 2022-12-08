// https://blog.logrocket.com/building-rich-text-editors-in-react-using-draft-js-and-react-draft-wysiwyg/
import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Button, FloatingLabel } from "react-bootstrap";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import parse from "html-react-parser";
import { format } from "date-fns";
import "./UserCV.css";
import MyEditor from "components/MyEditor";
import PreviewModal from "components/PreviewModal";
import useStore from "store";

function UserCV({
  cv,
  setPageMsg,
  setPageMsgStyle,
  setShowAlert,
  setUserCVInfo,
}) {
  // console.log(cv)
  const [showModal, setShowModal] = useState(false);

  const [convertedContent, setConvertedContent] = useState("");
  const addCVId = useStore((state) => state.addCVId);
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
          setPageMsgStyle("success");
          setShowAlert(true);
          addCVId(response.data.id);
        })
        .catch((error) => {
          console.log(error);
          if (error.response) {
            setPageMsg(error.response.data.message);
            setPageMsgStyle("danger");
            setShowAlert(true);
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
          setPageMsgStyle("success");
          setShowAlert(true);
        })
        .catch((error) => {
          console.log(error);
          if (error.response) {
            setPageMsg(error.response.data.message);
            setPageMsgStyle("danger");
            setShowAlert(true);
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
    <div className="mt-5 shadow-lg cv-builder-card">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        enableReinitialize
      >
        <Form className="">
          <div>
            <Field type="hidden" name="id" className="form-control col-auto" />
          </div>
          <div
            className="my-3 d-flex align-items-center"
            style={{ height: "48px" }}
          >
            <FloatingLabel label="CV Name" className="w-100">
              <Field
                name="name"
                placeholder="CV Name"
                className="form-control col-auto"
              />
            </FloatingLabel>
            <button
              className="button-preview ms-2"
              onClick={() => setShowModal(true)}
            >
              Preview
            </button>
          </div>
          <ErrorMessage
            name="name"
            component="p"
            className="text-danger text-start"
          />
          <div className="mb-3">
            {/* <p className="h5 text-start my-3">Content</p> */}
            <MyEditor
              content={cv.content}
              setConvertedContent={setConvertedContent}
            />
          </div>
          {/* <div className="d-grid gap-2  col-6 mx-auto">
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
          </div> */}

          {/*  */}

          <div
            className="d-flex flex-column flex-lg-row justify-content-between ms-auto"
            style={{ gap: "8px", maxWidth: "50%", marginTop: "30px" }}
          >
            <Button
              variant="light"
              className="btn-jobdash w-100"
              onClick={() => resetEditorState()}
            >
              Reset
            </Button>
            <Button variant="dark" className="btn-jobdash w-100" type="submit">
              Save
            </Button>
          </div>
        </Form>
      </Formik>
      <PreviewModal
        show={showModal}
        setShow={setShowModal}
        title={cv.name}
        content={convertedContent}
      />
      {/* <p>{parse(convertedContent)}</p> */}
    </div>
  );
}

export default UserCV;
