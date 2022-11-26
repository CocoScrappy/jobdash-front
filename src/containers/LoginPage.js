import Layout from "components/Layout";
import {Formik,Form,Field,ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const LoginPage = ()=>{

  const onSubmit=(data)=>{
      axios
            .post(`http://localhost:8000/api/token/`,data)
            .catch((error)=>{
              console.log(error)
            })
            .then((response)=>{
              console.log(response);
              localStorage.setItem("rtoken",response.data.refresh);
              localStorage.setItem("atoken",response.data.access);
            }
              )
    }

  const validationSchema=Yup.object().shape({
    email:Yup
                .string()
                .required('Field must not be blank.'),
    password:Yup.string()
                .required('Field must not be blank.'),
  });

  const initialValues ={
    email:"",
    password:"",
        };

    return (
        <Layout title='AuthSite | LoginPage' content='Login Page'>
            <h1>Login</h1>
            <Formik onSubmit={onSubmit} validationSchema={validationSchema} initialValues={initialValues}>
              <Form>
                <div className='row'>
                  <label>Email</label>
                  <Field name='email'></Field>
                  <ErrorMessage name="email">
                                          {msg=><div className="errorMsg">{msg}</div>}
                  </ErrorMessage>
                </div>
                <div className='row'>
                  <label>Password</label>
                  <Field  name='password'
                          type='password'/>
                  <ErrorMessage name="password">
                                          {msg=><div className="errorMsg">{msg}</div>}
                  </ErrorMessage>
                </div>
                
                <div id="register-btn"className="row">
                          <button className="btn btn-secondary" type="submit" >Login</button>
                </div>

                <div className='row'>
                  <span className='errorMsg'></span>
                </div>
              </Form>
           </Formik>
        </Layout >
    )
}
export default LoginPage;