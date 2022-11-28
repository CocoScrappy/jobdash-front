import axios from "axios";
import Layout from "components/Layout";
import {useNavigate} from 'react-router-dom'
import React, { useState} from 'react';
import * as Yup from 'yup';
import {Formik, Form, Field,ErrorMessage} from 'formik'

const RegisterPage = ()=>{
    const navigate=useNavigate();
    const [usernameTaken,setUsernameTaken]=useState("");
    const [emailTaken,setEmailTaken]=useState("");
    
    const onSubmit=(data)=>{
        data.summary="";
        console.log(data);
        axios.post(`${process.env.REACT_APP_API_URL}/api/register`,data)
            .catch((error)=>{
                //reset previous errors
                setEmailTaken("");
                setUsernameTaken("");


            switch(error.response.data){
                case 'Email Already Taken':
                    setEmailTaken('Email Already Taken');
                    break;
                case 'Username Already Taken':
                    setUsernameTaken('Username Already Taken');
                    break;
                default:
                    break;
            }
            })
            .then((res)=>{
                navigate('/login')
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
                    <span className='errorMsg'>{usernameTaken}</span>
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
                        <option value="user">User</option>
                        <option value="employer">Recruiter</option>
                    </Field>
                </div>

                <div className="row">
                    <label>Password:</label>
                    <Field  name="password"
                            type="password"
                            placeholder="Min 6 characters, Max 32 "/>
                    <ErrorMessage name="password">
                                    {msg=><div className="errorMsg">{msg}</div>}
                    </ErrorMessage>
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