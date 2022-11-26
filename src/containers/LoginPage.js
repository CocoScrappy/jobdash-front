import Layout from "components/Layout";
import {Formik,Form,Field,ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import useStore from "store";

const LoginPage = ()=>{

  const uId=useStore(state=>state.id);
  const addUId=useStore(state=>state.addId);

  const uFirstName=useStore(state=>state.first_name);
  const addUFirstName=useStore(state=>state.addFirstName);

  const uLastName=useStore(state=>state.last_name);
  const addULastName=useStore(state=>state.addLastName);

  const uEmail=useStore(state=>state.email);
  const addUEmail=useStore(state=>state.addEmail);

  // const iniUser=useStore(state=>state.addUserInfo);
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
            })
            .then(()=>{
              axios
                .get(`http://localhost:8000/api/me`,{headers:{"Authorization":"Bearer "+localStorage.getItem('atoken')}})
                .catch((error)=>{
                  console.log(error);
                })
                .then((res)=>{
                  // console.log("Response "+res.data.id);
                  // iniUser(res.data);
                  // console.log("State: "+JSON.stringify(getUser));
                  addUId(res.data.id);
                  addUFirstName(res.data.first_name);
                  addULastName(res.data.last_name);
                  addUEmail(res.data.email);

                  console.log(uEmail)

                })
            })
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