import axios from "axios";
import Layout from "layouts/MainLayout";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import LargeBannerLayout from "layouts/LargeBannerLayout";
// Bootstrap
import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import FloatingLabel from "react-bootstrap/FloatingLabel";

// CSS
import "../css/components/Link.css";
import "../css/components/Button.css";
import { NewLine } from "helpers/Utils";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [passwordError, setpasswordError] = useState("");
  const [emailTaken, setEmailTaken] = useState("");

  const onSubmit = async (data) => {
    data.summary = "";
    console.log(data);
    await axios
      .post(`${process.env.REACT_APP_API_URL}/api/register`, data)
      .then((res) => {
        console.log(res)
        navigate("/login");
      })
      .catch((error) => {
        //reset previous errors
        setEmailTaken("");
        setpasswordError("");
        console.log(error)
        if(error.response.data.password!=null){
          error.response.data.password.forEach(err=>setpasswordError(state=>state+'\n'+err))
        }

        var emailError=error.response.data.email[0]
        if(emailError!=null){
          setEmailTaken(emailError.charAt(0).toUpperCase()+emailError.slice(1));
        }

        return;
      })
  };
  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    role: "user",
    password: "",
    confirmPass: "",
  };

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required("Please type in your first name."),
    last_name: Yup.string().required("Please type in your last name."),
    email: Yup.string()
      .email("Must be valid email address.")
      .required("Please type in your email."),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters.")
      .max(32, "Password must be at most 32 characters.")
      .required("Please type in a password."),
    confirmPass: Yup.string()
      .required("Please retype your password.")
      .oneOf([Yup.ref("password")], "Your passwords do not match."),
  });
  return (
    <Layout title="AuthSite | Register page" content="Register page">
      <LargeBannerLayout header="Create an account">
        <Formik
          onSubmit={onSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          <Form>
            <div className="form-floating mb-3">
              <Field
                name="first_name"
                className="form-control"
                id="floatingPassword"
                placeholder="Jane"
              />
              <label htmlFor="floatingPassword">First name</label>
              <ErrorMessage name="first_name">
                {(msg) => <div className="errorMsg">{msg}</div>}
              </ErrorMessage>
            </div>

            <div className="form-floating mb-3">
              <Field
                name="last_name"
                className="form-control"
                id="floatingPassword"
                placeholder="Doe"
              />
              <label htmlFor="floatingPassword">Last name</label>
              <ErrorMessage name="last_name">
                {(msg) => <div className="errorMsg">{msg}</div>}
              </ErrorMessage>
            </div>

            <div className="form-floating mb-3">
              <Field
                name="email"
                className="form-control"
                id="floatingPassword"
                placeholder="jd@email.com"
                onKeyDown={()=>{setEmailTaken("")}}
              />
              <label htmlFor="floatingPassword">Email</label>
              <ErrorMessage name="email">
                {(msg) => <div className="errorMsg">{msg}</div>}
              </ErrorMessage>
            </div>

            <div className="mb-3">
              <span className="errorMsg">{emailTaken}</span>
            </div>

            <div className="mb-3">
              <label htmlFor="roleSelect" className="form-label">
                I am a...
              </label>
              <Field
                as="select"
                name="role"
                className="form-select"
                aria-label="Role select"
                id="roleSelect"
              >
                <option value="user">Job seeker</option>
                <option value="employer">Recruiter</option>
              </Field>
            </div>

            <div className="form-floating mb-3">
              <Field
                name="password"
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                onKeyDown={()=>{setpasswordError("")}}
              />
              <label htmlFor="floatingPassword">Password (6 - 32 characters)</label>
              <ErrorMessage name="password">
                {(msg) => <div className="errorMsg">{msg}</div>}
              </ErrorMessage>
            </div>

            <div className="form-floating mb-3">
              <Field
                name="confirmPass"
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
              />
              <label htmlFor="floatingPassword">Confirm password</label>
              <ErrorMessage name="password"></ErrorMessage>
              <ErrorMessage name="confirmPass">
                {(msg) => <div className="errorMsg">{msg}</div>}
              </ErrorMessage>
            <div className="mb-3">
              <NewLine text={passwordError}/>
            </div>
            </div>

            <div id="register-btn" className="d-grid gap-2 mb-3">
              <Button
                variant="dark"
                className="btn-jobdash"
                size="lg"
                type="submit"
                onClick={()=>{setpasswordError("")}}
              >
                Get started
              </Button>
            </div>
            <p>
              Already have an account?{" "}
              <Link to="/login" className="jobdash-link">
                Login
              </Link>
            </p>
          </Form>
        </Formik>
      </LargeBannerLayout>
    </Layout>
  );
};
export default RegisterPage;
