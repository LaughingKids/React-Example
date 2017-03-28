import React, {Component} from 'react';
import PageHeader from '../page-header/PageHeader';
import PageBuilderSections from './PageBuilderSections';
import CurrencyExchangeRate from '../currency-exchange-rate/CurrencyExchangeRate';
import MobileCurrencyExchangeRate from '../currency-exchange-rate-mobile/MobileCurrencyExchangeRate';
import CalculatorContainer from '../calculator/CalculatorContainer';

class PageBuilderPages extends Component {
	constructor() {
		super();
		this.state={
			pageSections:[],
			pageHeader:[],
			pageTitle:[],
			pageBody:[]
		}
	}
	componentDidMount(){
		this.loadPageContentAndMetaViaServer();
	}
	loadPageContentAndMetaViaServer(){
		let language = helper.readCookie(helper.cookieLangKey);
		var metaQuery = '?with_meta=1';
		$.ajax({
	    	url: constant.apiNameSpace + language +'/page/' + this.props.pageName + metaQuery,
	    	dataType: 'json',
	    	cache: false,
	    	success: function(pageRespData) { 
	    		this.setState({pageBody:pageRespData.content.rendered});
	    		this.setState({pageSections:pageRespData.metas.page_sections});
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
	render(){
		if(this.props.pageName != 'home'){
			return (
				<div className="PageBuilderPages">
					<PageHeader 
						headerInfo = {this.state.pageHeader}
						pageName = {this.props.pageName}
						pageTitle = {this.state.pageTitle}
					/>
					<CurrencyExchangeRate />
					<MobileCurrencyExchangeRate />
					<CalculatorContainer 
						style='horizontal'
						moreLabelKey="calculator-inner-page-btn-label"
						moreLink="#howitworks"/>
					<PageBuilderSections
						sections={this.state.pageSections}
						pageContent={this.state.pageBody}
					/> 
				</div>
			)
		} else {
			return(
				<div className="PageBuilderPages">
					<PageHeader 
						headerInfo = {this.state.pageHeader}
						pageName = {this.props.pageName}
						pageTitle = {this.state.pageTitle}
					/>
					<CurrencyExchangeRate />
					<MobileCurrencyExchangeRate />
					<PageBuilderSections
						sections={this.state.pageSections}
						pageContent={this.state.pageBody}
					/> 
				</div>
			)
		}
		
	}
}

module.exports = PageBuilderPages