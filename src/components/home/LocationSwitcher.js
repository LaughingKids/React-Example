import React, { Component } from 'react'

class LocationSwitcher extends Component {
    changeMapLocation(event) {
        var clickAddress = event.currentTarget;
        var newLocation=$(clickAddress).find(".location").html();
        $.ajax({
            url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + newLocation,
            dataType:'json',
            cache: false,
            success:function(geocodeApiResp) {
                var result = geocodeApiResp.results[0].geometry;
                goldmateMap.setCenter(result.location);
                goldmateMarker.setPosition(result.location);
                goldmateMarker.setAnimation(google.maps.Animation.DROP);
            }
        })
    }
    highlightPos(event){
        $('.LocationSwitcher').removeClass('active');
        $(event.currentTarget).addClass('active');
    }
    render() {
      	var addressLable = 'Address:';
      	var phoneLable = 'Tel:';
      	var emailLable = 'Email:';
      	var location = this.props.data;
        var moreTel = '';
        var switcherClass = ' LocationSwitcher ' + this.props.theClass;
      	if(location.office_contact_email === ''){
      		  emailLable = '';
      	}
        if(location.office_telephones.length > 1) {
            moreTel = location.office_telephones[1].telephone;
        }
        return (
      	 	<div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
      	 		<div className={switcherClass} onClick={this.changeMapLocation} onMouseOver={this.highlightPos}>
      	 			<p className='officeName'>{location.office_name}</p>
      	 			<p className='itemLabel'>{addressLable}</p>
      	 			<p className='info location'>{location.office_location}</p>
      	 			<p><span className='itemLabel'>{phoneLable}</span><span className='info'>{location.office_telephones[0].telephone}</span></p>
              <p className='moreTel'>{moreTel}</p>
      	 			<p className='itemLabel'>{emailLable}</p>
              <p className='info'>{location.office_contact_email}</p>
      	 		</div>
      		</div>
        )
    }
}

module.exports = LocationSwitcher