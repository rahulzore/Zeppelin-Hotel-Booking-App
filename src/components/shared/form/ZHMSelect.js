import React from 'react';

export const ZHMSelect = ({
    input,
    label,
    options,
    className,
    meta: { touched, error, warning }
}) => {

    function renderOptions(){
        return options.map((option, index)=>{
            return <option key={index} value={option}>{option}</option>
        });
    }
    
    return (
        <div className='form-group'>
            <label>{label}</label>
            <div className='input-group'>
                <select {...input}  className={className}>
                    {renderOptions()}
                </select>
            </div>
            {touched &&
                ((error && <div className='alert alert-danger'>{error}</div>))}

        </div>
    )}