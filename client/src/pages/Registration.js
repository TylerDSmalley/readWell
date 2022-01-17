import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate  } from "react-router-dom";

function Registration() {

    let navigate  = useNavigate();

    const initialValues = {
        username: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required("You must input a username"),
        password: Yup.string().min(4).max(20).required("You must input a password")
    });

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/auth", data).then((response) => {
            navigate("/");
        });
    };


    return (
        <div className="loginContainer">
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className="formContainer">
                    <label>Username: </label>
                    <ErrorMessage name="username" component="span" />
                    <Field
                        id="inputCreatePost"
                        name="username"
                        placeholder="(Ex. John123...)"
                    />

                    <label>Password: </label>
                    <ErrorMessage name="password" component="span" />
                    <Field
                        type="password"
                        id="inputCreatePost"
                        name="password"
                        placeholder="(Ex. password...)"
                    />

                    <button type="submit"> Register </button>
                </Form>
            </Formik>
        </div>
    )
}

export default Registration
