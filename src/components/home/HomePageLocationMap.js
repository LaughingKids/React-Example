import React, { Component } from 'react';
import LocationSwitcher from './LocationSwitcher';

class HomePageLocationMap extends Component {
    constructor(){
        super();
        this.state = {
            locations:[],
            mapAddress:[]
        }
    }
    componentDidMount(){
        this.loadLocationsViaServer();
    }
    drawGoogleMap(){
        $.ajax({
            url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + this.state.mapAddress,
            dataType:'json',
            cache: false,
            success:function(geocodeApiResp) {
                var result = geocodeApiResp.results[0].geometry;
                var mapOptions = {
                    center: result.location,
                    zoom: this.props.mapOptions.zoom,
                    scrollwheel: this.props.mapOptions.scrollwheel,
                    navigationControl: this.props.mapOptions.navigationControl,
                    mapTypeControl: this.props.mapOptions.mapTypeControl,
                    scaleControl: this.props.mapOptions.scaleControl,
                    draggable: this.props.mapOptions.draggable,
                    streetViewControl: this.props.mapOptions.streetViewControl,
                }
                goldmateMap = new google.maps.Map(document.getElementById('homeMap'),mapOptions);
                goldmateMarker = new google.maps.Marker({
                    position: result.location,
                    map: goldmateMap,
                    icon: this.props.mapOptions.markerIcon,
                    animation: google.maps.Animation.DROP,
                });
            }.bind(this)
        })
    }
    loadLocationsViaServer(){
        $.ajax({
            url: '/json-api/restml/en/acf/option',
            success: function(options){
                this.setState({locations:options.goldmate_exchange_locations});
                this.setState({mapAddress:options.goldmate_exchange_locations[0].office_location});
                this.drawGoogleMap();
            }.bind(this)
        })
    }
    render() {
        var locationSwitcher = this.state.locations.map(function(location,key){
            var activeClass = '';
            if(key == 0) {
                activeClass = 'active';
            }
            return (
                <LocationSwitcher
                    key={key}
                    data={location}
                    theClass={activeClass}
                />
            );
        });
        var locationBlockTitle = 'Location';
        return (
            <div className="HomePageLocationMap">
                <div className="HomePageLocation">
                    <div className="container">
                        <p className="SubTitle">{locationBlockTitle}</p>
                        <div className="row">
                            {locationSwitcher}
                        </div>
                    </div>
                </div>
                <div id="homeMap"></div>
            </div>
        )
    }
}

module.exports = HomePageLocationMap