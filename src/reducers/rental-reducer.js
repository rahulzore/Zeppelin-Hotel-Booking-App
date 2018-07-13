import { FETCH_RENTAL_BY_ID_SUCCESS, FETCH_RENTAL_BY_ID_INIT, FETCH_RENTALS_SUCCESS, FETCH_RENTALS_INIT,  FETCH_RENTALS_FAIL } from '../actions/types';


const INTIAL_STATE = {
    rentals: {
        data: [],
        errors: []
    },
    rental: {
        data: {}
    }
}


export const rentalReducer = (state= INTIAL_STATE.rentals, action) => {
    switch(action.type){
        case FETCH_RENTALS_INIT:
            return {...state, data: [], errors: []};

        case FETCH_RENTALS_FAIL:
            return Object.assign({}, state, {errors: action.errors, data: []});

        case FETCH_RENTALS_SUCCESS:
            return {...state, data: action.rentals};


        default:
            return state;
    }
}

export const selectedRentalReducer = (state= INTIAL_STATE.rental, action) => {
    switch(action.type){

        case FETCH_RENTAL_BY_ID_INIT:
            return {...state, data: {}};

        case FETCH_RENTAL_BY_ID_SUCCESS:
            return Object.assign({}, state, {data: action.rental});
            //return {...state, data: action.rental}

        default:
            return state;
    }
}