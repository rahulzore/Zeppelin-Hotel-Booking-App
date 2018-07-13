import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { ZHMInput } from 'components/shared/form/ZHMInput';
import { ZHMTextArea } from 'components/shared/form/ZHMTextArea';
import { ZHMSelect } from 'components/shared/form/ZHMSelect';
import { ZHMFileUpload } from 'components/shared/form/ZHMFileUpload';
import { ZHMResError } from 'components/shared/form/ZHMResError';
//import { required, minLength4 } from 'components/shared/form/validator';


const RentalCreateForm = props => {
    const { handleSubmit, pristine, submitting, submitCb, valid, options, errors } = props
    return (
        <form onSubmit={handleSubmit(submitCb)}>

            <Field
                name="title"
                type="text"
                label='Title'
                className="form-control"
                component={ZHMInput}
            />
            <Field
                name="description"
                type="text"
                label='Description'
                rows='6'
                className="form-control"
                component={ZHMTextArea}
            />
             <Field
                name="city"
                type="text"
                label='City'
                className="form-control"
                component={ZHMInput}               
            />
             <Field
                name="street"               
                type="text"
                label='Street'
                className="form-control"
                component={ZHMInput}               
            />
            <Field
                name="category"               
                options={options}
                label='StreeCategoryt'
                className="form-control"
                component={ZHMSelect}               
            />
             <Field
                name="image"               
                label='Image'
                component={ZHMFileUpload}               
            />
             <Field
                name="bedrooms"               
                type="number"
                label='Bedrooms'
                className="form-control"
                component={ZHMInput}               
            />

            <Field
                name="dailyRate"              
                type="text"
                label='Daily Rate'
                className="form-control"
                symbol='$'
                component={ZHMInput}               
            />
            <Field
                name="shared"              
                type="checkbox"
                label='Shared'
                className="form-control"
                component={ZHMInput}               
            />

           



            <button className="btn btn-bwm btn-form" type="submit" disabled={!valid || pristine || submitting}>
                Create Rental
        </button>
        <ZHMResError errors={errors}/>

        </form>
    )
}




export default reduxForm({
    form: 'rentalCreateForm',
    initialValues: {shared: false, category: 'apartment'}
})(RentalCreateForm)