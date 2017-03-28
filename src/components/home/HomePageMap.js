import React, { Component } from 'react'

class HomePageMap extends Component {
    componentDidMount(){
        this.loadAddressViaServer();
    }
    loadAddressViaServer(){
        $.ajax({
            url: '/json-api/restml/en/acf/option',
            success: function(options){
                var address = options.goldmate_exchange_locations[0].office_location;
//                console.log('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyCdrDg-GsSz3LMTAHs15U0zy8fr9877szY');
                $.ajax({
                    url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyCdrDg-GsSz3LMTAHs15U0zy8fr9877szY',
                    dataType: 'json',
                    cache: false,
                    success: function(googleApiResp){
//                        console.log(googleApiResp);
                    }
                })
            }
        })
    }
    render() {
        return (
          <div id="homeMap"></div>
        )
    }
}

module.exports = HomePageMap