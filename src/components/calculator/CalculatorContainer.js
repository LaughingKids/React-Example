import React,{Component} from 'react';
import Calculator from './Calculator';
import CalculatorQueryModal from './CalculatorQueryModal';

class CalculatorContainer extends Component {
	constructor(){
		super();
		this.state={
			currencyList:[],
			currencyQuery:[],
			calculatorMargin:''
		}
	}
	loadCurrencyViaServer(){
		var apiRequest = '/currency-api/ratepairs';
		$.ajax({
			url: apiRequest,
			dataType: 'json',
			cache: false,
			success: function(currencyRates){
				this.setState({currencyList:currencyRates});
			}.bind(this)
		});
	}
	componentDidMount(){
		this.loadCurrencyViaServer();
	}
	render(){
		if(this.state.currencyList.length === 0) {
			return (
				<div className="CalculatorContainer">
				</div>
			)
		} else {
			return(
				<div className="CalculatorContainer">
					<Calculator
						data={this.state.currencyList}
						style={this.props.style}
						furtherQuery={this.state.currencyQuery}
						buttonLabelKey={this.props.moreLabelKey}
						buttonLabelLink={this.props.moreLink}
						calculatorFactor={this.state.calculatorMargin}
					/>
					<CalculatorQueryModal 
						currencyInForm={this.state.currencyList}/>
				</div>
			)
		}
		
	}
}	

module.exports = CalculatorContainer;