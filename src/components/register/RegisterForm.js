import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { ZHMInput } from 'components/shared/form/ZHMInput';
import { ZHMResError } from 'components/shared/form/ZHMResError';


const RegisterForm = props => {
    const { handleSubmit, pristine, submitting, submitCb, valid, errors } = props
    return (
        <form onSubmit={handleSubmit(submitCb)}>


            <Field
                name="username"
                
                type="text"
                label='Username'
                component={ZHMInput}
                className="form-control"
            />

            <Field
                name="email"
                
                type="email"
                label='Email'
                className="form-control"
                component={ZHMInput}
            />

            <Field
                name="password"
                
                type="password"
                label='Password'
                className="form-control"
                component={ZHMInput}
            />

            <Field
                name="passwordConfirmation"
                
                type="password"
                label='Confirm Password'
                className="form-control"
                component={ZHMInput}
            />



            <button className="btn btn-bwm btn-form" type="submit" disabled={!valid || pristine || submitting}>
                Register
        </button>
        <ZHMResError errors={errors}/>

        </form>
    )
}

const validate = values => {
    const errors = {}

    if (values.username && values.username.length < 4) {
        errors.username = 'Username min length is 4 characters!';
    }
    if (!values.email) {
        errors.email = "Please enter an email!";
    }
    if (!values.passwordConfirmation) {
        errors.passwordConfirmation = "Please enter password confirmation!";
    }

    if (values.password !== values.passwordConfirmation) {
        errors.password = 'Passwords must match!';
    }
    return errors
}


export default reduxForm({
    form: 'registerForm', validate
})(RegisterForm)