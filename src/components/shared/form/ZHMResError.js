import React from 'react';

export function ZHMResError(props) {
    const errors = props.errors;

    return (
        errors.length > 0 &&
        <div className="alert alert-danger bwm-res-errors">
            {errors.map((error, index) => <p key={index}>{error.detail}</p>)}
        </div>
    )
}