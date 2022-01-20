import React from 'react';
import { Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function CreateUsers(){

    let navigate = useNavigate();

    const initialValues = {firstName:"",lastName:"", password: "",email:"", role:"user"};

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().min(2).max(30).required("First Name must be between 2 and 30 characters"),
        lastName: Yup.string().min(2).max(30).required("Last Name must be between 2 and 30 characters"),
        password: Yup.string().min(2).max(30).required("Password must be between 2 and 30 characters"),
        email: Yup.string().email().required()
    });

    const onSubmit = (data) =>{
        console.log(data)
        axios.post("http://localhost:3001/admin/users/create", data).then((response)=>{
        navigate("/admin/users/list");
    });
    }

    return(
        <div className="container">
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form >
                <label>First name:&nbsp;</label>
                <ErrorMessage name="firstName" component="span" />
                <Field  name="firstName" placeholder="Ex.John"/><br/>
                <label>Last Name:&nbsp;</label>
                <ErrorMessage name="lastName" component="span" />
                <Field  name="lastName" placeholder="Ex. Smith"/><br/>
                <label>Password:&nbsp;</label>
                <ErrorMessage name="password" component="span" />
                <Field  type="password" name="password" placeholder="Password here.."/><br/>
                <label>Email:&nbsp;</label>
                <ErrorMessage name="email" component="span" />
                <Field  name="email" placeholder="Ex. name@domain.com"/><br/>
                <div id="role">User Role:</div>
                <div role="group" aria-labelledby="role">
                <label>
              <Field type="radio" name="role" value="user" />
              User
                </label>
                <label>
              <Field type="radio" name="role" value="admin" />
                Admin
                </label></div>
                <button type="submit">Create User</button>
            </Form>
            </Formik>
        </div>
    )
}

export default CreateUsers