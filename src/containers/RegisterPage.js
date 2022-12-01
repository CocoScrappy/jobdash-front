import axios from "axios";
import Layout from "components/Layout";
import {useNavigate} from 'react-router-dom'
import React, { useState} from 'react';
import * as Yup from 'yup';
import {Formik, Form, Field,ErrorMessage} from 'formik'

const RegisterPage = ()=>{
    const navigate=useNavigate();
    
    const [emailTaken,setEmailTaken]=useState("");
    const [pwdError, setPwdError]=useState("");

    
    const onSubmit=(data)=>{
        data.summary="";
        console.log(data);
        axios.post(`${process.env.REACT_APP_API_URL}/api/register`,data)
            .then((res)=>{
                navigate('/login')
            })
            .catch((error)=>{
                //reset previous errors
                setEmailTaken("");
                setPwdError("")
                console.log(error)

                if(error.response.data.email){
                    error.response.data.email.forEach(emErr=>{
                        if(emErr!=="This field may not be blank.")
                            {
                                setEmailTaken(emErr[0].toUpperCase()+emErr.slice(1));
                            }
                    })
                }
                if(error.response.data.password){    
                    error.response.data.password.forEach((pwErr)=>{
                        if(pwErr!=null)
                        {
                            setPwdError(pwErr)
                        }
                    })
                }
                        
            })
    }
    const initialValues ={
        first_name:"",
        last_name:"",
        email:"",
        role:"user",
        password:"",
        confirmPass:""
            };


            const validationSchema=Yup.object().shape({
                first_name:Yup
                            .string()
                            .required('Please type in your first name.'),
                last_name:Yup
                            .string()
                            .required('Please type in your last name.'),
                email:Yup
                            .string()
                            .email("Must be valid email address.")
                            .required("Please type in your email."),
                password:Yup.string()
                            .min(6,"Password must be at least 6 characters.")
                            .max(32,"Password must be at most 32 characters.")
                            .required('Please type in a password.'),
                confirmPass:Yup
                            .string()
                            .required('Please retype your password.')
                            .oneOf([Yup.ref('password')], 'Your passwords do not match.')
            });
    return (
        <Layout title='AuthSite | Register page' content='Register page'>
            <h1>Register</h1>
            <div className='container'>
        
        <Formik onSubmit={onSubmit} initialValues={initialValues} validationSchema={validationSchema}>
            <Form >
                <div className='row'>
                    <label>First Name:</label>
                    <Field name="first_name"/>
                    <ErrorMessage name="first_name">
                                    {msg=><div className="errorMsg">{msg}</div>}
                    </ErrorMessage>
                </div>

                <div className='row'>
                    <label>Last Name:</label>
                    <Field name="last_name"/>
                    <ErrorMessage name="last_name">
                                    {msg=><div className="errorMsg">{msg}</div>}
                    </ErrorMessage>
                </div>

                

                <div className="row">
                    <label>Email:</label>    
                    <Field  name="email"/>
                    <ErrorMessage name="email">
                                    {msg=><div className="errorMsg">{msg}</div>}
                    </ErrorMessage>
                </div>
                <div className="row">
                    <span className='errorMsg'>{emailTaken}</span>
                </div>

                <div className='row'>
                    <label>Select Role:</label>
                    <Field as="select" name="role">
                        <option value="user">Applicant</option>
                        <option value="employer">Recruiter</option>
                    </Field>
                </div>

                <div className="row">
                    <label>Password:</label>
                    <Field  name="password"
                            type="password"
                            placeholder="Min 8 characters"/>
                    <ErrorMessage name="password">
                                    {msg=><div className="errorMsg">{msg}</div>}
                    </ErrorMessage>
                </div>

                <div className="row">
                    <span className='errorMsg'>{pwdError}</span>
                </div>
                
                <div className="row">
                    <label>Confirm Password:</label>
                    <Field  name="confirmPass"
                            type="password"/>
                    <ErrorMessage name="confirmPass">
                                    {msg=><div className="errorMsg">{msg}</div>}
                    </ErrorMessage>
                </div>

                <div id="register-btn"className="row">
                    <button className="btn btn-secondary" type="submit" >Register</button>
                </div>
            </Form>
        </Formik>
    </div>

        </Layout >
    );
};
export default RegisterPage;