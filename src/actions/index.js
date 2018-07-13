import axios from 'axios';
import authService from 'services/auth-service';
import axiosService from 'services/axios-service';
import { FETCH_RENTAL_BY_ID_SUCCESS, FETCH_RENTAL_BY_ID_INIT, FETCH_RENTALS_SUCCESS, LOGIN_SUCCES, LOGIN_FAILURE, LOGOUT, FETCH_RENTALS_INIT, FETCH_RENTALS_FAIL} from './types';

//Rentals Actions

const axiosInstance = axiosService.getInstance();

const fetchRentalByIdInit = () =>{
    return {
        type: FETCH_RENTAL_BY_ID_INIT
    }
}

const fetchRentalByIdSuccess = (rental) => {
    return {
        type: FETCH_RENTAL_BY_ID_SUCCESS,
        rental
    }
}

const fetchRentalsSuccess = (rentals) => {
    return {
        type: FETCH_RENTALS_SUCCESS,
        rentals
    }
}

const fetchRentalsInit = () => {
    return {
        type: FETCH_RENTALS_INIT
    }
}

const fetchRentalsFail = (errors) => {
    return {
        type: FETCH_RENTALS_FAIL,
        errors
    }
}

export const fetchRentals = (city) => {

    const url = city ? `/rentals?city=${city}` : '/rentals';
    return dispatch => {
        dispatch(fetchRentalsInit());

        axiosInstance.get(url).then((res)=>{
            return res.data
        }).then(rentals => {
            dispatch(fetchRentalsSuccess(rentals));
        })
        .catch(({response})=>{
            dispatch(fetchRentalsFail(response.data.errors))
        });
    }
}

export const createRental = (rentalData) =>{
    return axiosInstance.post('/rentals', {...rentalData}).then(
        (res)=>{
            return res.data;
        },
        (err)=>{
            return Promise.reject(err.response.data.errors);
        }
    )
}



export const fetchRentalById = (rentalID) => {
     

    return function(dispatch){
        
        dispatch(fetchRentalByIdInit());
        

        axios.get(`/api/v1/rentals/${rentalID}`).then((res)=>{
            return res.data
        }).then(rental => {
            dispatch(fetchRentalByIdSuccess(rental));
        })
        
    }
}

//AUTH Actions

export const register = (userData) =>{
    return axios.post('/api/v1/users/register', {...userData}).then(
        (res)=>{
            return res.data;
        },
        (err)=>{
            return Promise.reject(err.response.data.errors);
        }
    )
}

const loginSuccess = () =>{
    const username = authService.getUsername();
    return {
        type: LOGIN_SUCCES,
        username
    }
}

const loginFailure = (errors) => {
    return {
        type: LOGIN_FAILURE,
        errors
    }
}

export const checkAuthState= () => {
    return dispatch => {
        if(authService.isAuthenticated()){
            dispatch(loginSuccess());
        }
    }
}

export const login = (userData) => {
    return dispatch => {
        return axios.post('/api/v1/users/auth', userData)
        .then(res=> res.data)
        .then(token => {
            authService.saveToken(token);
            dispatch(loginSuccess());
        })
        .catch(({response})=>{
            dispatch(loginFailure(response.data.errors));
        })
    }
}

export const logout = () => {
    authService.inValidateUser();
    return {
        type: LOGOUT
    }
}

export const createBooking = (booking) => {
    return axiosInstance.post('/bookings', booking)
    .then(res=>res.data)
    .catch(({response})=>Promise.reject(response.data.errors));
}