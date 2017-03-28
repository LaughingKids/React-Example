import React, {Component} from 'react';
import CurrencyExchangeTable from './CurrencyExchangeTable';
import AlignCurrentExchangeTable from './AlignCurrentExchangeTable';

class CurrencyExchangeRate extends Component {
	constructor(){
		super();
		this.state={
			allCurrency:[],
			flagImgPath:[],
			askMargin:'',
			bidMargin:'',
			sellMargin:'',
			buyMargin:''
		}
	}
	loadCurrencyFlagViaServer(){
		$.ajax({
			url: '/currency-flag/images',
			dataType: 'json',
			cache: false,
			success:function(currencyFlags) {
				// console.log(currencyFlags);
				this.setState({flagImgPath:currencyFlags});
			}.bind(this)
		});
	}
	loadCurrencyViaServer(){
		var five = new Array();
		var apiRequest = '/currency-api/ratepairs';
		$.ajax({
			url: apiRequest,
			dataType: 'json',
			cache: false,
			success: function(currencyRates){
				this.setState({allCurrency:currencyRates});
			}.bind(this)
		})
	}
	componentDidMount(){
		this.loadCurrencyViaServer();
		this.loadCurrencyFlagViaServer();
	}
	render(){
		if(this.state.allCurrency.length === 0 || this.state.flagImgPath.length === 0) {
			return(
				<div className="CurrencyExchangeRate pc" />
			)
		} else {
			return (
				<div className="CurrencyExchangeRate pc">
					<AlignCurrentExchangeTable
						data={this.state.allCurrency}
						thePath={this.state.flagImgPath}
					/>
				</div>
			)
		}
		
	}
}

module.exports = CurrencyExchangeRate