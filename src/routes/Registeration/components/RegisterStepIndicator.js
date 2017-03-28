import React,{Component} from 'react';
import $ from 'jquery';
import TranslateString from '../../../components/translate-string/TranslateString';

class RegisterStepIndicator extends Component {
	detectHighlight(theStep){
		var stepLibrary = new Array('selector','samples','form','thanks');
		var currentIndex = stepLibrary.indexOf(this.props.currentStep);
		var indicatorIndex = stepLibrary.indexOf(theStep);
		if(currentIndex >= indicatorIndex)
			return true;
		else
			return false;
	}
	render(){
		if(this.props.indicatorOptions){
			return(
				<div className="RegisterStepIndicator">
					<div className="container">
						<div className="row">
							<div className="col-md-12 col-xs-12 col-sm-12">
								<p className="registerationPageTitle">
									{this.props.indicatorOptions.register_title}
								</p> 
							</div>
						</div>
						<div className="row">
							<div className="col-md-offset-1 col-md-3 col-sm-12 col-xs-12">
								<div className="stepIndicator" id="selector" data-active={this.detectHighlight('selector')}>
									<TranslateString
										stringKey="register-step-1"
									/>
									<span className="stepDescription">
										{this.props.indicatorOptions.register_steps[0].step_description}
									</span>
								</div>
							</div>
							<div className="col-md-offset-1 col-md-3 col-sm-12 col-xs-12">
								<div className="stepIndicator" id="samples" data-active={this.detectHighlight('samples')}>
									<TranslateString
										stringKey="register-step-2"
									/>
									<span className="stepDescription">
										{this.props.indicatorOptions.register_steps[1].step_description}
									</span>
								</div>
							</div>
							<div className="col-md-offset-1 col-md-3 col-sm-12 col-xs-12">
								<div className="stepIndicator" id="form" data-active={this.detectHighlight('form')}>
									<TranslateString
										stringKey="register-step-3"
									/>
									<span className="stepDescription">
										{this.props.indicatorOptions.register_steps[2].step_description}
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		} else {
			return (<div className="RegisterStepIndicator"/>);
		}
		
	}
}

module.exports = RegisterStepIndicator;