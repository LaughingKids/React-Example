import React, { Component } from 'react';
import LocationSwitcher from './LocationSwitcher';
import TranslateString from '../translate-string/TranslateString';
class LocationMap extends Component {
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
                goldmateMap = new google.maps.Map(document.getElementById('Map'),mapOptions);
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
        var language = helper.readCookie(helper.cookieLangKey);
//        console.log(constant.apiNameSpace + language + constant.optionsRequest);
        $.ajax({
            url: constant.apiNameSpace + language + constant.optionsRequest,
            success: function(options){
                this.setState({locations:options.goldmate_exchange_locations});
                this.setState({mapAddress:options.goldmate_exchange_locations[0].google_address});
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
        return (
            <div className="LocationMap">
                <div className="GoldmateLocations">
                    <div className="container">
                        <TranslateString
                            tag = "p"
                            stringKey = {this.props.locationBlockTitleKey}
                            theClass = 'SubTitle'
                        />
                        <div className="row">
                            {locationSwitcher}
                        </div>
                    </div>
                </div>
                <div id="Map"></div>
            </div>
        )
    }
}

module.exports = LocationMap