import React, { Component } from 'react';
import LocationSwitcher from './LocationSwitcher';

class HomePageLocationMap extends Component {
    constructor(){
        super();
        this.state = {
            locations:[]
        }
    }
    componentDidMount(){
        this.loadLocationsViaServer();
    }
    loadLocationsViaServer(){
        $.ajax({
        url: '/json-api/restml/en/acf/option',
        success: function(options){
            this.setState({locations:options.goldmate_exchange_locations})
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
                <div className="container">
                    <p className="SubTitle">{locationBlockTitle}</p>
                    <div className="row">
                        {locationSwitcher}
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = HomePageLocationMap