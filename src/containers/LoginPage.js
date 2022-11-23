import Layout from "components/Layout";
import {Formik,Form,ErrorMessage} from 'formik';
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
                localStorage.setItem("token",response.data.token);
              }
                )
    }

    return (
        <Layout title='AuthSite | LoginPage' content='Login Page'>
            <h1>Login</h1>
        </Layout >
    )
}
export default LoginPage;