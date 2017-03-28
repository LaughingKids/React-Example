import React,{Component} from 'react';
import PageHeader from '../../../components/page-header/PageHeader';
import CurrencyExchangeRate from '../../../components/currency-exchange-rate/CurrencyExchangeRate';
import MobileCurrencyExchangeRate from '../../../components/currency-exchange-rate-mobile/MobileCurrencyExchangeRate';

class CalculatorCurrencyPair extends Component {
	constructor(){
		super();
		this.pageName = "calculator-currency-pair";
		this.state = {
			pageHeader:[],
			pageTitle:[]
		}
	}
	loadCalculatorPageViaServer() {
		let language = helper.readCookie(helper.cookieLangKey);
		var metaQuery = '?with_meta=1';
		$.ajax({
	    	url: constant.apiNameSpace + language +'/page/' + this.pageName + metaQuery,
	    	dataType: 'json',
	    	cache: false,
	    	success: function(pageRespData) { 
	    		this.setState({pageTitle:pageRespData.title.rendered});
	    		if(pageRespData.metas.header_blocks.length != 0) {
	    			this.setState({pageHeader:pageRespData.metas.header_blocks[0]});
	    		}
		    }.bind(this),
		    error: function(xhr, status, err) {
		        console.error(this.props.url, status, err.toString());
		    }.bind(this)
	    });
	}
	componentDidMount(){
		this.loadCalculatorPageViaServer();
	}
	render() {
		return (
			<div className="CalculatorCurrencyPair">	
				<PageHeader 
					headerInfo = {this.state.pageHeader}
					pageName = {this.pageName}
					pageTitle = {this.state.pageTitle}
				/>
				<CurrencyExchangeRate />
				<MobileCurrencyExchangeRate />
			</div>
		)
	}
}

module.exports = CalculatorCurrencyPair;