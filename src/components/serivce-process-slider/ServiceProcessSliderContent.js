import React,{Component} from 'react';
import ServiceProcessSliderSIVForm from './ServiceProcessSliderSIVForm';
import ServiceProcessSliderInnerController from './ServiceProcessSliderInnerController';

class ServiceProcessSliderContent extends Component {
	constructor(){
		super();
		this.state={
			currencyOptions:[]
		}
	}
	loadCurrencyViaServer(){
		var apiRequest = '/currency-api/ratepairs';
		$.ajax({
			url: apiRequest,
			dataType: 'json',
			cache: false,
			success: function(currencyRates){
				this.setState({currencyOptions:currencyRates});
			}.bind(this)
		});
	}
	componentDidMount(){
		if(this.props.theService == 'siv-service')
			this.loadCurrencyViaServer();
	}
	render(){
		var order = '';
		if(this.props.data.metas)
			order = this.props.data.metas.service_process_order;
		var orderId = 'slider-'+order;
		var slogon = "";
		if(order == '') {
			orderId = 'home';
			slogon = this.props.data.slogon.rendered;
		}
		var vcContent = helper.cleanTheLinks(this.props.data.content.rendered);
		if(this.props.theService == 'siv-service' && order == 1) {
			return (
				<ServiceProcessSliderSIVForm
					stepOrder={order}
					postId={this.props.data.id}
					currencyOps={this.state.currencyOptions}
					currentStepName = {this.props.data.title.rendered}
					stepChangeFunction={this.props.stepChangeHandler}
					formStepContentObject={this.props.contentObject}
				/>
			)	
		} else {
			return (
				<div className='ServiceProcessSliderContent' id={orderId} data-service-pid={this.props.data.id}>
					<div className='container'>
						<div className="row">
							<div className='col-md-12 col-xs-12 col-sm-12'>
								<p className="processTitleGroup">
									<span id='processOrder'>
										{order}
									</span>
									<span id='processTitle'>
										{this.props.data.title.rendered}
									</span>
								</p>
								<p className="processSlogon" dangerouslySetInnerHTML={{__html:slogon}} />
							</div>
						</div>
						<ServiceProcessSliderInnerController 
							currentStepName = {this.props.data.title.rendered}
							currentStep = {order}
							buttonEventHandler={this.props.stepChangeHandler}
							stepContentObject={this.props.contentObject}
						/>
						<div className='row' id="vcContents" dangerouslySetInnerHTML={{__html:vcContent}} />
					</div>
				</div>
			)
		}
	}
}

module.exports = ServiceProcessSliderContent;