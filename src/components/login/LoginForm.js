import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { ZHMInput } from 'components/shared/form/ZHMInput';
import { ZHMResError } from 'components/shared/form/ZHMResError';
import { required, minLength4 } from 'components/shared/form/validator';


const LoginForm = props => {
    const { handleSubmit, pristine, submitting, submitCb, valid, errors } = props
    return (
        <form onSubmit={handleSubmit(submitCb)}>


          

            <Field
                name="email"
                
                type="email"
                label='Email'
                className="form-control"
                component={ZHMInput}
                validate={[required, minLength4]}
            />

            <Field
                name="password"
                
                type="password"
                label='Password'
                className="form-control"
                component={ZHMInput}
                validate={[required]}
            />

           



            <button className="btn btn-bwm btn-form" type="submit" disabled={!valid || pristine || submitting}>
                Login
        </button>
        <ZHMResError errors={errors}/>

        </form>
    )
}




export default reduxForm({
    form: 'loginForm'
})(LoginForm)