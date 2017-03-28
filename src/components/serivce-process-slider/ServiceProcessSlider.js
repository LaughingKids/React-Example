import React,{Component} from 'react';
import ServiceProcessSliderContent from './ServiceProcessSliderContent';
import TranslateString from '../translate-string/TranslateString';
class ServiceProcessSlider extends Component {
	constructor(){
		super();
		this.state={
			serviceSteps:[],
			currentStep:[]
		}
	}
	innerStepChangeHandler(event,targetStep,sliderObj) {
		sliderObj.setState({currentStep:targetStep});
	}
	changeStep(event,sliderObj) {
	    /* change step functions */
		var index = event.currentTarget.value;
		var controller = event.currentTarget;
		var parent = $(controller).parent();
		if(parent.attr('id') == 'innerController') {
			if(index == 0)
				$(parent).hide();
		} else {
			if(index != 0) {
				$("#innerController").show();
				$('#startController').show();
				$('#contactUsLink').hide();
			}
		}
		if(index == 0) {
			$("#innerController").hide();
			$('#startController').hide();
			$('#contactUsLink').show();
		} 
		sliderObj.setState({currentStep:index});
	}
	componentDidMount(){
		this.getServiceProcessViaServer();
	}
	firstSliderContentFactory(serviceStepsRespData){
		// alert(1);
		var largeMiddleCol = 12 / serviceStepsRespData.length;
	    var colClass = 'col-md-'+largeMiddleCol+' col-sm-6 col-xs-12';
		var contentBody = '';
		$.map(serviceStepsRespData,function(stepObject,index){
			var subConent = '<div class="'+colClass+' stepBlock">';
			var imageUrl = helper.imageUrlFactory(stepObject.featured_media_origin_url);
			subConent += '<label for="start">';
			subConent += '<img src="'+ imageUrl +'"/>';
			subConent += '</label>';
			subConent += '<p class="serviceStepTitle">' + stepObject.title.rendered + '</p>';
			subConent += '<p class="serviceStepOrder"><span class="orderLabel">' + stepObject.metas.service_process_order+ '</span></p>';
			subConent += '</div>';
			contentBody += subConent;
		});
		var homeContent = new Object();
		var title = Object();
		title.rendered = this.props.data.section_title;
		var slogon = Object();
		slogon.rendered = this.props.data.section_content;
		var content = Object();
		content.rendered = contentBody;
		homeContent.title = title;
		homeContent.content = content;
		homeContent.slogon = slogon;
		// console.log(serviceStepsRespData);
		return homeContent;
	}
	getServiceProcessViaServer(){
		let language = helper.readCookie(helper.cookieLangKey);
		var targetCategory = this.props.data.service_process_category;
		var siv = false;
		if(language != 'en') {
			targetCategory += '-zh';
		}
		var metaQuery = '/goldmate-service/?filter[order]=asc&filter[taxonomy]=goldmate-service-category&filter[term]=' + targetCategory + '&with_meta=1'
//		console.log(constant.apiNameSpace + language + metaQuery);
		$.ajax({
	    	url: constant.apiNameSpace + language + metaQuery,
	    	dataType: 'json',
	    	cache: false,
	    	success: function(respData) {
	    		var firstSlider = this.firstSliderContentFactory(respData);
	    		respData.unshift(firstSlider);
	    		this.setState({serviceSteps:respData});
	    		this.setState({currentStep:0});
		    }.bind(this),
		    error: function(xhr, status, err) {
		        console.error(this.props.url, status, err.toString());
		    }.bind(this)
	    });
	}
	render(){
		var contentData = this.state.serviceSteps[this.state.currentStep];
		var nextPage = parseInt(this.state.currentStep) + 1;
		if(nextPage == this.state.serviceSteps.length)
			nextPage = 0;
		var prePage = this.state.currentStep == 0 ? 0 : parseInt(this.state.currentStep) - 1;
		var contactLink = '/' + helper.readCookie(helper.cookieLangKey) + '/contact-us';
		var serviceType = this.props.data.service_process_category;
		if(contentData) {
			return(
				<div className='ServiceProcessSlider'>
					<ServiceProcessSliderContent 
						data={contentData} 
						theService={serviceType}
						stepChangeHandler={this.innerStepChangeHandler}
						contentObject={this}
					/>
					<div className='container'>
						<div className='row' id='startController'>
							<div className="col-md-12 col-xs-12 col-sm-12">
								<button id='start' value={nextPage} onClick={(e)=>this.changeStep(e,this)}>
									<TranslateString stringKey='slider-next-step-label' />
								</button>
							</div>
						</div>
						<div className='row' id='contactUsLink'>
							<div className="col-md-12 col-xs-12 col-sm-12">
								<a href={contactLink}>
									<TranslateString stringKey='contact-us-label' />
								</a>
							</div>
						</div>
					</div>
				</div>
			)
		} else {
			return(
				<div className='ServiceProcessSlider'></div>
			);
		}
		
	}
}

module.exports = ServiceProcessSlider;