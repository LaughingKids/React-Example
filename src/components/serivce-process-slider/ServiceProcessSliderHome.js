import React,{Component} from 'react';

class ServiceProcessSliderHome extends Component {
	render(){
		var content = '';
		var sliderHomeObj = this;
		$.map(this.props.data,function(stepObject,index){
//			console.log(stepObject);
			var imgLink = helper.imageUrlFactory(stepObject.featured_media_origin_url);
//			console.log(imgLink);
			var subConent = '<div class="'+sliderHomeObj.props.subclass+'">';
			subConent += '<img src="'+imgLink+'"/>';
			subConent += '<p class="serviceStepTitle">' + stepObject.title.rendered + '</p>';
			subConent += '<p class="serviceStepOrder"><span class="orderLabel">' + stepObject.metas.service_process_order+ '</span></p>';
			subConent += '</div>';
//			content += subConent;
		});
		console.log(content);
		return (
			<div className='ServiceProcessSliderHome'>
				<div className="container">
					<div className='row' dangerouslySetInnerHTML={{__html:content}}>
					</div>
				</div>
			</div>
		)
	}
}

module.exports = ServiceProcessSliderHome;