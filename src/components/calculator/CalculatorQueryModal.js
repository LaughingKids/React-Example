import React,{Component} from 'react';
import ContactForm from '../contactform/ContactForm';
import TranslateString from '../translate-string/TranslateString';

class CalculatorQueryModal extends Component {
	render(){
		var id = 505;
		return (
			<div className="CalculatorQueryModal">
				<div className="modal fade" id='calculateQueryForm'>
				  	<div className="modal-dialog" role="document">
					    <div className="modal-content">
							<div className="modal-header">
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
								</button>
								<h4 className="modal-title">{this.props.modalTitle}</h4>
							</div>
					      <div className="modal-body">
					      	<TranslateString
					      		stringKey='exchange-form-title'
					      		tag="p"
					      		theClass="exFormTitle"
					      	/>
					      	<TranslateString
					      		stringKey='exchange-form-slogen'
					      		tag="p"
					      		theClass="exFormSlogen"
					      	/>
					      	<ContactForm 
					        	id={id}
					        	name="enquiry"
					        	currencyOptions={this.props.currencyInForm}/>
					      </div>
					    </div>
				  	</div>
				</div>
			</div>
		)
	}
}

module.exports = CalculatorQueryModal;