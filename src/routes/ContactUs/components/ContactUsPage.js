import React, {Component} from 'react';
import LocationMap from '../../../components/LocationMap/LocationMap';
import ContactForm from '../../../components/contactform/ContactForm';

class ContactUsPage extends Component {
	constructor(){
		super();
		this.state = {
			pageMetas:[],
			pageTitle:[]
		}
	}
	loadPageContentAndMetaViaServer(){
		let language = helper.readCookie(helper.cookieLangKey);
		var metaQuery = '?with_meta=1';
		//console.log('/json-api/restml/' + language +'/page/contact-us' + metaQuery);
		$.ajax({
	    	url: '/json-api/restml/' + language +'/page/contact-us' + metaQuery,
	    	dataType: 'json',
	    	cache: false,
	    	success: function(pageRespData) { 
//				console.log(pageRespData.metas);
	    		this.setState({pageMetas:pageRespData.metas});
	    		this.setState({pageTitle:pageRespData.title.rendered});
		    }.bind(this),
		    error: function(xhr, status, err) {
		        console.error(this.props.url, status, err.toString());
		    }.bind(this)
	    });
	}
	componentDidMount(){
		this.loadPageContentAndMetaViaServer();
	}
	render(){
		var mapOps = {
            zoom:16,
            scrollwheel:false,
            navigationControl:false,
            mapTypeControl:false,
            scaleControl:false,
            draggable:false,
            streetViewControl:false,
            zoomControl:false,
            markerIcon:'/assets/images/goldmate-map-marker.png'
        }
        var subscribeFormId = 152;
        return (
			<div className="ContactUs">
				<div className="container">
					<p className='pageTitle'>{this.state.pageTitle}</p>
					<div className="hotlineBlock">
						<div className="row">
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
								<p>
									<span className="hotlineLable">{this.state.pageMetas.hotline_label}</span>
									<span className="hotlineNumber">{this.state.pageMetas.our_hotline}</span>
								</p>
								<p className="hotlineDescription" dangerouslySetInnerHTML={{__html:this.state.pageMetas.hotline_description}} />
							</div>
						</div>
					</div>
					<LocationMap 
		                mapOptions={mapOps}
					/>
					<div className='row'>
				      	<div className = "col-md-12 col-lg-12 col-sm-12 col-xs-12">
				      		<p className='enquiryTitle'>{this.state.pageMetas.query_form_label}</p>
				      		<p className='enquiryIntro' dangerouslySetInnerHTML={{__html:this.state.pageMetas.query_form_intro}}/>
				      		<div className="EnquiryForm">
				      			 <ContactForm 
						        	id={subscribeFormId}
						        	name="enquiry"/>
				      		</div>
				      	</div>
				    </div>
		        </div>
			</div>
		)
	}
}

module.exports = ContactUsPage