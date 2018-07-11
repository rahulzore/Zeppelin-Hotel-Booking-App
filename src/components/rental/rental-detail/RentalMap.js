import React from 'react';
import {  MapWithGeocode } from 'components/map/GoogleMap';

export class RentalMap extends React.Component {
    render() {
        const location = this.props.location;
        return (
            <MapWithGeocode
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC9eTT7vAQ5TJh1AGjaQ0zKgdHWpoTGZTw&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `360px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                location={location}
            />
        )
    }
}