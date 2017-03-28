import React,{Component} from 'react';
import $ from 'jquery';
import ContactForm from '../../../components/contactform/ContactForm';

class RegisterationForm extends Component {
	stepChange(event) {
		if(event) {
			this.props.stepChangeFunction();
		}
	}
	stepBack(event) {
		if(event) {
			this.props.stepBackFunction();
		}
	}
	formSubmitted(status) {
		// alert(status);
		this.props.stepChangeFunction();
	}
	render(){
		var subscribeFormId = 743;
		var formLabel = '';
		if(this.props.formLablesMeta.metas) {
			//console.log(this.props.formLablesMeta.metas.query_form_intro);
			formLabel = this.props.formLablesMeta.metas.query_form_intro;
		}
		// console.log(this.props.variableValues);
		return (
			<div className="RegisterationForm">
				<div className="RegisterationFormContent">
					<div className="container">
						<div className="row">
							<div className="col-md-offset-3 col-md-6 col-sm-12 col-xs-12">
					      		<div className="EnquiryForm">
					      			<p className='formLabel' dangerouslySetInnerHTML={{__html:formLabel}} />
					      			<ContactForm 
							        	id={subscribeFormId}
							        	name="register"
							        	custermizeFields={this.props.variableValues}
							        	afterSuccessFunction={this.formSubmitted.bind(this)}/>
					      		</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

module.exports = RegisterationForm;