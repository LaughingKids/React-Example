import React,{Component} from 'react';
import $ from 'jquery';
import TranslateString from '../../../components/translate-string/TranslateString';
import RegisterationSamplesHeader from './RegisterationSamplesHeader';

class RegisterationSamples extends Component {
	stepChange(event){
		if(event)
			this.props.stepChangeFunction();
	}
	stepBack(event) {
		if(event)
			this.props.stepBackFunction();
	}
	render() {
		var vcContent = helper.cleanTheLinks(this.props.targetSampleContent.content.rendered);
		return (
			<div className="RegisterationSamples">
				<RegisterationSamplesHeader 
					options = {this.props.selectOptions}
					theItems = {this.props.selectedItems}
				/>
				<div className="RegisterationSamplesContent">
					<div className="container">
						<div className="row">
							<div className="col-md-offset-2 col-md-8 col-sm-12 col-xs-12"  dangerouslySetInnerHTML={{__html:vcContent}} />
						</div> 
					</div>
				</div>
				<div className="registrationController">
					<button className="stepChangeTrigger" onClick={this.stepBack.bind(this)}>
						<TranslateString stringKey='previous-step-label' />
					</button>
					<button className="stepChangeTrigger" onClick={this.stepChange.bind(this)}>
						<TranslateString stringKey='next-step-label' />
					</button>
					<div className="clear"/>
				</div>
			</div>
		)
	}
}

module.exports = RegisterationSamples;