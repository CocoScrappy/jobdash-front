import Layout from "components/Layout";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import useStore from "store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const LoginPage = () => {
  const navigate = useNavigate();

  const addUId = useStore((state) => state.addId);
  const addUFirstName = useStore((state) => state.addFirstName);
  const addULastName = useStore((state) => state.addLastName);
  const addUEmail = useStore((state) => state.addEmail);
  const addURole = useStore((state) => state.addRole);

  const [errorMsg,setErrorMsg] = useState("");

  // const iniUser=useStore(state=>state.addUserInfo);
  const onSubmit = (data) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/token/`, data)
      .catch((error) => {
        if(error.response.data.detail!=null){
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
      });
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
    <Layout title="AuthSite | LoginPage" content="Login Page">
      <h1>Login</h1>
      <Formik
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        initialValues={initialValues}
      >
        <Form>
          <div className="row">
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
          </div>
        </Form>
      </Formik>
    </Layout>
  );
};
export default LoginPage;
