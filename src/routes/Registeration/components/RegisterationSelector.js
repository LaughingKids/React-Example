import React,{Component} from 'react';
import $ from 'jquery';
import RegisterationSelectorRow from './RegisterationSelectorRow';
import TranslateString from '../../../components/translate-string/TranslateString';

class RegisterationSelector extends Component {
	constructor() {
		super();
		this.state = {
			userSelectedClientType:'',
			userSelectedTransationDirection:'',
			userSelectedNationality:'',
		}
	}
	stepChange(event) {
		/* can not derectly call the function with update state */
		var combinations = this.stateValidation()
		if(event && combinations.length){
			// console.log(combinations.join('-'));
			this.getSampleContentViaServer(combinations.join('-'),this.props.selectorOptions.selector_options);
		}
	}
	getSampleContentViaServer(contentSlug){
		let language = helper.readCookie(helper.cookieLangKey);
		var apiRequest = language + '/goldmate-register/' + contentSlug + '?with_meta=1';
		$.ajax({
	    	url: constant.apiNameSpace + apiRequest,
	    	dataType: 'json',
	    	cache: false,
	    	success: function(respData) {
	    		this.props.stepChangeFunction(respData);
		    }.bind(this),
		    error: function(xhr, status, err) {
		        console.error(this.props.url, status, err.toString());
		    }.bind(this)
	    });
	}
	stateValidation() {
		var combinations = new Array();
		if( this.state.userSelectedClientType == 'enterprise' ) {
			if( this.state.userSelectedClientType.length && 
				this.state.userSelectedTransationDirection.length ) {
				combinations.push(this.state.userSelectedClientType);
				combinations.push(this.state.userSelectedTransationDirection);
				return combinations;
			}
		}
		if( this.state.userSelectedClientType.length 
			&& this.state.userSelectedNationality.length
			&& this.state.userSelectedTransationDirection.length) {
			combinations.push(this.state.userSelectedClientType);
			combinations.push(this.state.userSelectedNationality);
			combinations.push(this.state.userSelectedTransationDirection);
			return combinations;
		}
		return combinations;
	}
	handleSelectorItemClickEvent(event){
		if(event) {
			var selectedItem = $(event.target).parent().parent().find('.selectorItem.clicked');
			if(selectedItem.length) {
				/* change image */
				var selectedImage = $(selectedItem).css("background-image").replace('active','default');
				// console.log(selectedImage);
				$(selectedItem).css("background-image",selectedImage);
				$(event.target).parent().parent().find('.selectorItem.clicked').removeClass('clicked active');
			}
			$(event.target).addClass("clicked");
			var clickedImage = $(event.target).css("background-image").replace('default','active');
			$(event.target).css("background-image",clickedImage);
			var theItem = $(event.target).data('selector-item-key');
			var itemType = $(event.target).data('item-type');
			if(itemType == 'client-type') {
				if(theItem == 'enterprise') {
					$('#nationality').addClass('hide');
				} else {
					$('#nationality').removeClass('hide');
					this.setState({userSelectedNationality:''});
				}
			}
			if(theItem.length && itemType.length) {
				switch(itemType) {
					case 'client-type':
						this.setState({userSelectedClientType:theItem});
						break;
					case 'transation-direction':
						this.setState({userSelectedTransationDirection:theItem});
						break;
					case 'nationality':
						this.setState({userSelectedNationality:theItem});
						break;
				}
			}
		}
	}
	selectorBodyBuilder(targetSection) {
		var targetSelectorObject = $.grep(this.props.selectorOptions.selector_options, function(e) { 
			return e.options_key == targetSection; 
		});
		return targetSelectorObject[0];
	}
	render(){
		if(this.props.selectorOptions) {
			/* use this object inside map function */
			var selectorObj = this;
			var selectorRows = this.props.selectorOptions.selector_options.map(function(object,index){
				return (
					<RegisterationSelectorRow
						data = {object}
						selectorClickFunction={selectorObj.handleSelectorItemClickEvent.bind(selectorObj)}
						key={index}
					/>
				);
			})
			return (
				<div className="RegisterationSelector">
					<div className="RegisterationSelectorContent">
						{selectorRows}
					</div>
					<div className="registrationController">
						<button className="stepChangeTrigger" onClick={this.stepChange.bind(this)}>
							<TranslateString stringKey='next-step-label' />
						</button>
					</div>
				</div>
			);
		} else {
			return (<div className="RegisterationSelector"/>);
		}

	}
}

module.exports = RegisterationSelector;