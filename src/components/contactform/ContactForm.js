import React, {Component} from 'react';
import $ from 'jquery';
var ContactForm = React.createClass({
	getInitialState: function() {
		var language = helper.readCookie(helper.cookieLangKey);
		return {
			feedback:[],
			formHtml:[],
			submitLabel:[],
			formAction: '',
			feedbackClass:'hide',
			formId:''
		}
	},
	formBuilder: function(){
		var contactFormObject = this;
		$.getJSON("/assets/json/contactform.json",function(formJson){
			var targetId = this.props.id;
			var language = helper.readCookie(helper.cookieLangKey);
			for(var index = 0; index < formJson.forms.length; index++) {
				if(formJson.forms[index].language != language && formJson.forms[index].id == this.props.id) {
					targetId = formJson.forms[index].translated;
					break;
				}
			}
			var currentFormObj = this;
			var formHTML = '';
			var theForm = formJson.forms.find(function(form){
				return form.id === targetId;
			});
//			console.log(theForm);
			$.each(theForm.fields,function(index,field){
				var containerClass = ""
				var inputHTML='',labelHTML='';
				if(field.class) {
					containerClass = field.class;
				} else {
					containerClass = "col-md-12";
				}
				if(field.label) {
					containerClass += " inputWithLabel";
					labelHTML = "<div class='" + containerClass + "' data-input-type='" + field.type + "'>";
					labelHTML += "<p class='inputLabel'>" + field.label + "</p>";
				} else {
					containerClass += " inputNoLabel";
					labelHTML = "<div class='" + containerClass + "' data-input-type='" + field.type + "'>";
				}
				switch(field.type){
					case 'email':
						inputHTML = "<input type='email' name='" + field.name + "' placeholder='" + field.placeholder + "'/>";
						break;
					case 'tel':
						inputHTML = "<input type='tel' name='" + field.name + "' placeholder='" + field.placeholder + "'/>";
						break;
					case 'submit':
						currentFormObj.setState({submitLabel:field.value});
						break;
					case 'text':
						inputHTML = "<input type='text' name='" + field.name + "' placeholder='" + field.placeholder + "'/>";
						break;
					case 'date':
						inputHTML = "<input type='text' onfocus=\"(this.type='date')\" onblur=\"(this.type='text')\" name='" + field.name + "'/>";
						break;
					case 'textarea':
						inputHTML = "<textarea name='" + field.name + "' placeholder='" + field.placeholder + "'></textarea>";
						break;
					case 'pair-select':
						inputHTML = "<select name='" + field.name + "' id='" + field.name + "'>";
						if(currentFormObj.props.currencyOptions != null) {
							var optionHtml = "";
							var pairs = currentFormObj.props.currencyOptions;
							$.map(pairs,function(value,index){
								var theValue = value.CurrencyPair.substring(6,9);
								optionHtml += "<option value='" + theValue +"'>" + theValue + "</option>";
							});
						}
						inputHTML += optionHtml;
						inputHTML += "</select>";
						break;
					case 'hidden':
						inputHTML = "<input type='hidden' name='" + field.name + "' value='" + field.value + "' />";
						break;
					case 'customer':
						/*custermizeFields is an array*/
						var valueIndex = contactFormObject.props.custermizeFields.indexOf(field.name) + 1;
						var value = contactFormObject.props.custermizeFields[valueIndex];
						if(field.name == 'the-file-id' && typeof(value.id) != 'undefined' ) {
							value = value.id;
						} else if(field.name == 'the-form-combination') {
							value = value;	
						} else {
							value = '';
						}
						// console.log(value);
						inputHTML = "<input type='hidden' name='" + field.name + "' value='" + value + "' />";
						break;
				};
				formHTML += labelHTML;
				formHTML += inputHTML;
				formHTML += '</div>'; /*.inputWithLabel*/
			});
			this.setState({formId:targetId});
			this.setState({formAction:'/json-api/restml/'+ language + '/wpcf/' + targetId});
			this.setState({formHtml:formHTML});
//			console.log(targetId);
		}.bind(this));
	},
	postContactFormToServer: function(event) {
		event.preventDefault();
		var postData = {};
		var currentFormObj = this;
		var theForm = event.currentTarget;
		var form = $(theForm).parent().parent().find(".renderedFormFields");
		var inputs = $(form).find('input');
		var selects = $(form).find('select');
		var textarea = $(form).find('textarea');
		$.each(inputs,function(index,inputItem){
			if ($(inputItem).attr('type') !== 'submit') {
				postData[$(inputItem).attr('name')] = $(inputItem).val();
			}
		});
		$.each(textarea,function(index,textareaItem){
			postData[$(textareaItem).attr('name')] = $(textareaItem).val();
		})
		$.each(selects,function(index,inputItem){
			postData[$(inputItem).attr('name')] = $(inputItem).val();
		});
		// console.log(postData);
		$.ajax({
			url: this.state.formAction,
			dataType: 'json',
			type: 'POST',
			data:postData
		}).done(function(postResp){
			// console.log(postResp.status);
			switch(postResp.status) {
				case'mail_sent':
					currentFormObj.setState({feedback:postResp.message});
					currentFormObj.setState({feedbackClass:'success'});
					if(this.props.afterSuccessFunction)
						this.props.afterSuccessFunction(postResp.status);
					else
						currentFormObj.setState({feedback:postResp.message});
					break;
				default:
					currentFormObj.setState({feedback:postResp.message});
					currentFormObj.setState({feedbackClass:'fail'});
					break;
			}
			
		}.bind(this));
	},
	componentDidMount: function(){
		this.formBuilder();
	},
	render: function(){
		return (
			<div className="ContactForm">
				<form>
					<div className={this.props.name}>
						<div className='renderedFormFields row' id={this.props.id | this.state.formId} dangerouslySetInnerHTML={{__html:this.state.formHtml}} />
						<div className='custermizeSubmit'>
							<input type="submit" className="uppercase" onClick={this.postContactFormToServer} value={this.state.submitLabel}/>
						</div>
					</div>
				</form>
				<div className={this.state.feedbackClass}  role="alert">{this.state.feedback}</div>
			</div>
		)
	}
});

export default ContactForm;