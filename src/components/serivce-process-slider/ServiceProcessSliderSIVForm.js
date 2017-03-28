import React,{Component} from 'react';
import ContactForm from '../contactform/ContactForm';
import ServiceProcessSliderInnerController from './ServiceProcessSliderInnerController';

class ServiceProcessSliderSIVForm extends Component {
	render(){
		var formId = 505;
		// console.log(this.props.currencyOps);
		return (
			<div className='ServiceProcessSliderContent' id={'slider-'+this.props.stepOrder} data-service-pid={this.props.postId}>
				<div className='container'>
					<ServiceProcessSliderInnerController 
						currentStepName = {this.props.currentStepName}
						currentStep = {this.props.stepOrder}
						buttonEventHandler={this.props.stepChangeFunction}
						stepContentObject={this.props.formStepContentObject}
					/>
					<div className='row' dangerouslySetInnerHTML={{__html:this.props.theContent}} />
					<div className='row' id="siv-step-form">
						<ContactForm 
							id={formId}
							currencyOptions={this.props.currencyOps}/>
					</div> 
				</div>
			</div>
		);
	}
}

module.exports = ServiceProcessSliderSIVForm;