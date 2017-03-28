import React,{Component} from 'react';
import $ from 'jquery';

class RegisterationSelectorBlock extends Component {
	constructor(){
		super();
		this.state = {
			logoUrl:''
		}
	}
	mouseOverEvent(event){
		var mouseOverImage = $(event.target).css("background-image").replace('default','active');
//		console.log(mouseOverImage);
		$(event.target).css("background-image",mouseOverImage);
		$(event.target).addClass('active');
	}
	mouseLeaveEvent(event){
		if($(event.target).hasClass("clicked")) {
			return true;
		}
		var mouseLeaveImage = $(event.target).css("background-image").replace('active','default');
		$(event.target).css("background-image",mouseLeaveImage);
		$(event.target).removeClass('active');
	}
	render(){
		var url = helper.imageUrlFactory(this.props.data.default_logo.url);
		var sectionStyle = {
			backgroundImage: 'url(' + url + ')',
		};
		return (
			<div className="col-md-6">									
			    <div className="selectorItem"
			    	 id={this.props.data.item_value}
			    	 data-item-type={this.props.itemType} 
			         data-selector-item-key={this.props.data.item_value}
			         onClick={this.props.clickFunction.bind(this)}
			         onMouseOver={this.mouseOverEvent.bind(this)}
			         onMouseLeave={this.mouseLeaveEvent.bind(this)}
			         style={sectionStyle}>
			    </div>
			</div>
		)
	}
}

module.exports = RegisterationSelectorBlock;