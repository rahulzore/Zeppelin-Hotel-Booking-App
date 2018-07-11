import React from 'react';
import { connect } from 'react-redux';

import * as actions from 'actions';
import { RentalList } from './RentalList';



class RentalListing extends React.Component {

      
    componentWillMount(){
        this.props.dispatch(actions.fetchRentals());
    }

   

    render() {
        return (
            <section id='rentalListing'>
                <h1 className='page-title'>Your Home All Around the World</h1>
                <RentalList rentals={this.props.rentals}/>
                
                
            </section>
        );
    }
}

function mapStateToProps(state){
    return {
        rentals: state.rentals.data
    }
}

export default connect(mapStateToProps)(RentalListing)