import Layout from "layouts/MainLayout";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import useStore from "store";
import { Link, useNavigate } from "react-router-dom";
import LargeBannerLayout from "../layouts/LargeBannerLayout";
// Bootstrap
import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import FloatingLabel from "react-bootstrap/FloatingLabel";

// CSS
import "../css/components/Link.css";
import "../css/components/Button.css";
import { useState } from "react";

const LoginPage = () => {
  const navigate = useNavigate();

  const addUId = useStore((state) => state.addId);
  const addUFirstName = useStore((state) => state.addFirstName);
  const addULastName = useStore((state) => state.addLastName);
  const addUEmail = useStore((state) => state.addEmail);
  const addURole = useStore((state) => state.addRole);
  const addCVId = useStore((state) => state.addCVId);
  const [errorMsg, setErrorMsg] = useState("");

  // const iniUser=useStore(state=>state.addUserInfo);
  const onSubmit = (data) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/token/`, data)
      .catch((error) => {
        if (error.response.data.detail != null) {
          setErrorMsg(error.response.data.detail);
        }
      })
      .then((response) => {
        console.log(response);
        localStorage.setItem("rtoken", response.data.refresh);
        localStorage.setItem("atoken", response.data.access);
      })
      .then(() => {
        axios
          .get(`${process.env.REACT_APP_API_URL}/api/me`, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("atoken"),
            },
          })
          .catch((error) => {
            // console.log(error);
          })
          .then((res) => {
            // console.log("Response "+res.data.id);
            // iniUser(res.data);
            // console.log("State: "+JSON.stringify(getUser));
            addUId(res.data.id);
            addUFirstName(res.data.first_name);
            addULastName(res.data.last_name);
            addUEmail(res.data.email);
            addURole(res.data.role);
            navigate("/dashboard");
          });
      })
      .then(() => {
        axios
      .get(`${process.env.REACT_APP_API_URL}/api/cvs/get_user_cvs/`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("atoken") },
      })
      .then((response) => {
        if (response.data.id != null) {
        addCVId(response.data.id);
        } else {
          addCVId("");
        }
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
      })
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Field must not be blank."),
    password: Yup.string().required("Field must not be blank."),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  return (
    <Layout title="JOBDASH - Login" content="Login Page">
      <LargeBannerLayout header="Welcome back">
        <Formik
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          initialValues={initialValues}
        >
          <Form>
            {/* New form - Uses React-Bootstrap - NOT FUNCTIONAL*/}
            {/* <FloatingLabel
              controlId="floatingInput"
              label="Email"
              className="mb-3"
            >
              <Form.Control
                name="email"
                type="email"
                placeholder="email@provider.com,"
              />
              <ErrorMessage name="email">
                {(msg) => <div className="errorMsg">{msg}</div>}
              </ErrorMessage>
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingPassword"
              label="Password"
              className="mb-3"
            >
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
              />
              <ErrorMessage name="password">
                {(msg) => <div className="errorMsg">{msg}</div>}
              </ErrorMessage>
            </FloatingLabel>

            <Form.Group
              className="mb-3 d-flex justify-content-between w-100"
              controlId="formBasicCheckbox"
            >
              <Form.Check type="checkbox" label="Remember me" />
              <p>Forgot password</p>
            </Form.Group>

            <div className="d-grid gap-2 mb-3">
              <Button
                variant="dark"
                className="btn-jobdash"
                size="lg"
                type="submit"
              >
                Login
              </Button>
            </div>
            <p>
              Don't have an account?{" "}
              <Link to="/register" className="jobdash-link">
                Register
              </Link>
            </p>
            <span className="errorMsg"></span> */}

            {/* Intermediary form - uses Formik & Reg. Bootstrap CSS - FUNCTIONAL */}
            <div className="form-floating mb-3">
              <Field
                name="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
              />
              <label for="floatingInput">Email</label>
              <ErrorMessage name="email">
                {(msg) => <div className="errorMsg">{msg}</div>}
              </ErrorMessage>
            </div>

            <div className="form-floating mb-3">
              <Field
                name="password"
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
              />
              <label for="floatingPassword">Password</label>
              <ErrorMessage name="password">
                {(msg) => <div className="errorMsg">{msg}</div>}
              </ErrorMessage>
            </div>

            <div
              className="mb-3 d-flex justify-content-between w-100"
              controlId="formBasicCheckbox"
            >
              {/* <Form.Check type="checkbox" label="Remember me" /> */}
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label className="form-check-label" for="flexCheckDefault">
                  Remember me
                </label>
              </div>
              <p>Forgot password</p>
            </div>

            <div id="register-btn" className="d-grid gap-2 mb-3">
              <Button
                variant="dark"
                className="btn-jobdash"
                size="lg"
                type="submit"
              >
                Login
              </Button>
            </div>
            <p>
              Don't have an account?{" "}
              <Link to="/register" className="jobdash-link">
                Register
              </Link>
            </p>

            <span className="errorMsg"></span>

            {/* Old form - FUNCTIONAL BUT NO STYLE*/}
            {/* <div className="row">
            <label>Email</label>
            <Field name="email"></Field>
            <ErrorMessage name="email">
              {(msg) => <div className="errorMsg">{msg}</div>}
            </ErrorMessage>

          </div>

          <div className="row">
            <label>Password</label>
            <Field name="password" type="password" />
            <ErrorMessage name="password">
              {(msg) => <div className="errorMsg">{msg}</div>}
            </ErrorMessage>
          </div>
          <div className="errorMsg">{errorMsg}</div>
          <div id="register-btn" className="row">
            <button className="btn btn-secondary" type="submit">
              Login
            </button>
          </div>

          <div className="row">
            <span className="errorMsg"></span>
          </div> */}
          </Form>
        </Formik>
      </LargeBannerLayout>
    </Layout>
  );
};
export default LoginPage;
