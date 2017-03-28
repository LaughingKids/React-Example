import React,{Component} from 'react';
import $ from 'jquery';
import RegisterStepIndicator from './RegisterStepIndicator';
import RegisterationSelector from './RegisterationSelector';
import RegisterationSamples from './RegisterationSamples';
import RegisterationForm from './RegisterationForm';
import RegisterationThanks from './RegisterationThanks';


class Registeration extends Component {
	constructor(){
		super();
		this.state={
			currentStep:'selector',
			targetSample:'',
			registerationOptions:[],
			serviceTypeImg:'',
			serviceTypeName:'',
			selectServiceSlug:''
		}
	}
	setTargetSample(sampleCotent){
		this.setState({selectServiceSlug:sampleCotent.metas.sample_case_combination});
		this.setState({targetSample:sampleCotent});
		this.setState({targetFormCombineFiles:sampleCotent.metas.form_files});
		this.setState({serviceTypeName:sampleCotent.metas.sample_case_name});
		this.setState({serviceTypeImg:sampleCotent.featured_media_origin_url});
		this.setState({currentStep:'samples'});
	}
	getRegisterForm() {
		this.setState({currentStep:'form'});
	}
	registrationThanks() {
		this.setState({currentStep:'thanks'});
	}	
	backToBefore() {
		var stepLibrary = new Array('selector','samples','form','thanks');
		var beforeIndex = stepLibrary.indexOf(this.state.currentStep) - 1;
		if(beforeIndex >= 0)
			this.setState({currentStep:stepLibrary[beforeIndex]});
	}
	getPageDataViaServer() {
		let language = helper.readCookie(helper.cookieLangKey);
		var apiRequest = language + '/page/registeration/' + '?with_meta=1';
		$.ajax({
	    	url: constant.apiNameSpace + apiRequest,
	    	dataType: 'json',
	    	cache: false,
	    	success: function(respData) {
	    		this.setState({registerationOptions:respData});
		    }.bind(this),
		    error: function(xhr, status, err) {
		        console.error(this.props.url, status, err.toString());
		    }.bind(this)
	    });
	}
	componentDidMount() {
		this.getPageDataViaServer();
	}
	render(){
		switch(this.state.currentStep) {
			case 'samples':
				return (
					<div className="Registeration" data-step="samples">
						<RegisterStepIndicator 
							currentStep={this.state.currentStep}
							indicatorOptions={this.state.registerationOptions.metas}
						/>
						<div className="RegisterStepContent">
							<div className="container">
								<div className="row">
									<RegisterationSamples 
										stepChangeFunction={this.getRegisterForm.bind(this)}
										stepBackFunction={this.backToBefore.bind(this)}
										targetSampleContent={this.state.targetSample}
										selectOptions={this.state.registerationOptions.metas.selector_options} 
										selectedItems={this.state.selectServiceSlug}/>
								</div>
							</div>
						</div>
					</div>
				);
			case 'form':
				/* value pair array oven-index is key, odd-index is value */
				var customerValues = new Array('the-file-id',this.state.targetFormCombineFiles);
				customerValues.push('the-form-combination');
				customerValues.push(this.state.selectServiceSlug);
				// console.log(customerValues);
				return (
					<div className="Registeration" data-step="form">
						<RegisterStepIndicator 
							currentStep={this.state.currentStep}
							indicatorOptions={this.state.registerationOptions.metas}
						/>
						<div className="RegisterStepContent">
							<div className="container">
								<div className="row">
									<RegisterationForm 
										stepChangeFunction={this.registrationThanks.bind(this)} 
										stepBackFunction={this.backToBefore.bind(this)}
										serviceName={this.state.serviceTypeName}
										serviceImage={this.state.serviceTypeImg}
										variableValues={customerValues}
										formLablesMeta={this.state.registerationOptions}
									/>
								</div>
							</div>
						</div>
					</div>
				);
			case 'thanks':
				return (
					<div className="Registeration" data-step="thanks">
						<div className="RegisterStepContent">
							<div className="container">
								<div className="row">
									<RegisterationThanks 
										serviceImage={this.state.serviceTypeImg}
										serviceName={this.state.serviceTypeName}
									/>
								</div>
							</div>
						</div>
					</div>
				);
			default:
				return (
					<div className="Registeration" data-step="selector">
						<RegisterStepIndicator 
							currentStep={this.state.currentStep}
							indicatorOptions={this.state.registerationOptions.metas}
						/>
						<div className="RegisterStepContent">
							<div className="container">
								<RegisterationSelector 
									stepChangeFunction={this.setTargetSample.bind(this)}
									selectorOptions={this.state.registerationOptions.metas}/>
							</div>
						</div>
					</div>
				);
		}
	}
}

module.exports = Registeration;