import React,{Component} from 'react';
import $ from 'jquery';

class ServiceProcessSliderInnerController extends Component {
	handleButtonClick(event) {
		var btnTarget = $(event.target).attr('id');
		var targetStep = this.props.currentStep - 1;
		if(btnTarget == 'close') {
			targetStep = 0;
		}
		if(this.props.buttonEventHandler) {
			this.props.buttonEventHandler(event,targetStep,this.props.stepContentObject);
		}
	}
	render(){
		return(
			<div className="ServiceProcessSliderInnerController" id={"step-" + this.props.currentStep}>
				<div className='container' id='innerController'>
					<div className='row'>
						<div className="col-md-9 col-xs-12 col-sm-12" id="processStepLable">
							<p className="processTitle">
								<span id='processOrder'>
									{this.props.currentStep}
								</span>
								<span id='processTitle'>
									{this.props.currentStepName}
								</span>
							</p>
						</div>
						<div className="col-md-3 col-xs-12 col-sm-12" id="processStepController">
							<button id='previous' onClick={this.handleButtonClick.bind(this)}/>
							<button id='close' onClick={this.handleButtonClick.bind(this)}/>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

module.exports = ServiceProcessSliderInnerController;