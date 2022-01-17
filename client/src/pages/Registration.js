import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Registration() {

    let navigate = useNavigate();

    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirmation: "",
    };

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().min(1).max(30).required("You must input a first name"),
        lastName: Yup.string().min(1).max(30).required("You must input a last name"),
        email: Yup.string().min(3).max(15).required("You must input a email"),
        password: Yup.string().min(4).max(20).required("You must input a password"),
        passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
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

                    <label>First Name: </label>
                    <ErrorMessage name="firstName" component="span" />
                    <Field
                        id="inputCreatePost"
                        name="firstName"
                        placeholder="(Ex. Jane...)"
                    />

                    <label>Last Name: </label>
                    <ErrorMessage name="lastName" component="span" />
                    <Field
                        id="inputCreatePost"
                        name="lastName"
                        placeholder="(Ex. Doe...)"
                    />

                    <label>email: </label>
                    <ErrorMessage name="email" component="span" />
                    <Field
                        id="inputCreatePost"
                        name="email"
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

                    <label>Confirm Password: </label>
                    <ErrorMessage name="passwordConfirmation" component="span" />
                    <Field
                        type="password"
                        id="inputCreatePost"
                        name="passwordConfirmation"
                        placeholder="(Ex. password...)"
                    />

                    <button type="submit"> Register </button>
                </Form>
            </Formik>
        </div>
    )
}

export default Registration
