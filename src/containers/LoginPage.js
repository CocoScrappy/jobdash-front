import Layout from "layouts/MainLayout";
import { Formik, Field, ErrorMessage } from "formik"; // Removed Form import from Formik
import * as Yup from "yup";
import axios from "axios";
import useStore from "store";
import { Link, useNavigate } from "react-router-dom";
import LargeBannerLayout from "layouts/LargeBannerLayout";
// Bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

// CSS
import "../css/components/Stylized-letters.css";

const LoginPage = () => {
  const navigate = useNavigate();

  const uId = useStore((state) => state.id);
  const addUId = useStore((state) => state.addId);

  const uFirstName = useStore((state) => state.first_name);
  const addUFirstName = useStore((state) => state.addFirstName);

  const uLastName = useStore((state) => state.last_name);
  const addULastName = useStore((state) => state.addLastName);

  const uEmail = useStore((state) => state.email);
  const addUEmail = useStore((state) => state.addEmail);

  const addURole = useStore((state) => state.addRole);

  // const iniUser=useStore(state=>state.addUserInfo);
  const onSubmit = (data) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/token/`, data)
      .catch((error) => {
        console.log(error);
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
            console.log(error);
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
    <Layout title="JOBDASH - Login" content="Login Page">
      <LargeBannerLayout>
        <h1>Welcome back</h1>

        <Formik
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          initialValues={initialValues}
        >
          <Form>
            {/* New form */}
            <FloatingLabel
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
              Don't have an account? <Link to="/register">Register</Link>
            </p>
            <span className="errorMsg"></span>

            {/* Old form */}
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
        {/* <h2 className="stylized-letters">JD</h2> */}
      </LargeBannerLayout>
    </Layout>
  );
};
export default LoginPage;
