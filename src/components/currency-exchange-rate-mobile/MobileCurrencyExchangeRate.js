import React, {Component} from 'react';
import MobileCurrencyTabs from './MobileCurrencyTabs';
import TranslateString from '../translate-string/TranslateString';
class MobileCurrencyExchangeRate extends Component {
	showTabs(){
		if($('.MobileCurrencyTabs').hasClass('active')){
			$('.MobileCurrencyTabs').removeClass('active');
			$('.MobileCurrencyTabs').fadeOut();
			$('.MobileCurrencyExchangeRate').height(60);
		} else {
			$('.MobileCurrencyTabs').addClass('active');
			$('.MobileCurrencyExchangeRate').height(660);
			$('.MobileCurrencyTabs').fadeIn();
		}
		$('#close').click(function(){
			if($('.MobileCurrencyTabs').hasClass('active')){
				alert(1);
				$('.MobileCurrencyTabs').removeClass('active');
				$('.MobileCurrencyTabs').fadeOut();
				$('.MobileCurrencyExchangeRate').height(60);
			}
		})
	}
	constructor(){
		super();
		this.state={
			allCurrency:[],
			flagImgPath:[],
		}
	}
	loadCurrencyFlagViaServer(){
		$.ajax({
			url: '/currency-flag/images',
			dataType: 'json',
			cache: false,
			success:function(currencyFlags) {
				//console.log(currencyFlags);
				this.setState({flagImgPath:currencyFlags});
			}.bind(this)
		});
	}
	loadCurrencyViaServer(){
		var apiRequest = '/currency-api/ratepairs';
		$.ajax({
			url: apiRequest,
			dataType: 'json',
			cache: false,
			success: function(currencyRates){
				this.setState({allCurrency:currencyRates});
			}.bind(this)
		});
	}
	componentDidMount(){
		this.loadCurrencyViaServer();
		this.loadCurrencyFlagViaServer();
	}
	render(){
		if(this.state.allCurrency.length === 0 || this.state.flagImgPath.length === 0) {
			return(
				<div className="MobileCurrencyExchangeRate mobile" />
			)
		} else {
			return (
				<div className="MobileCurrencyExchangeRate mobile">
					<div className='TabTableController'>
						<p className="exLable">
							<TranslateString
								stringKey="currency-exchange-button-label"
							/>
							<span className="lableBtn" onClick={()=>this.showTabs()}></span>
						</p>
					</div>
					<MobileCurrencyTabs 
						currencyPairs={this.state.allCurrency} 
						currencyLableFlags={this.state.flagImgPath}
					/>
				</div>
			)
		}
		
	}
}

module.exports = MobileCurrencyExchangeRate