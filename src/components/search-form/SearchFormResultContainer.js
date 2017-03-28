import React,{Component} from 'react';
import $ from 'jquery';
import SearchForm from './SearchForm';
import SearchResultList from './SearchResultList';

class SearchFormResultContainer extends Component {
	constructor() {
		super();
		this.state = {
			resultListContent:[],
			types:[]
		}
	}
	getAllPostTypeViaServer(){
		var language = helper.readCookie(helper.cookieLangKey);
		$.ajax({
			url: constant.apiNameSpace + language + '/types',
			dataType: 'json',
	    	cache: false,
	    	success: function(respData) {
	    		var searchableType = new Array();
	    		$(respData).each(function(index,typeObj){
	    			if(typeObj.slug == 'goldmate-market-wrap' || typeObj.slug == 'page') {
	    				searchableType.push(typeObj);
	    			}
	    				
	    		});
	    		// console.log(searchableType);
	    		this.setState({types:searchableType});
		    }.bind(this),
		    error: function(xhr, status, err) {
		        console.error(this.props.url, status, err.toString());
		    }.bind(this)
		});
	}
	clearResults() {
		this.setState({resultListContent:[]});
	}
	componentDidMount(){
		this.getAllPostTypeViaServer();
	}
	searchResultViaServer(searchKeywords){
		var allResults = new Array();
		var resultContents = new Array();
		if(this.state.types.length) {
			var searchQuery = "?filter[s]=" + searchKeywords;
			var language = helper.readCookie(helper.cookieLangKey);
			for(var index = 0; index < this.state.types.length; index++) {
				var slug = this.state.types[index].slug;
				$.ajax({
					url: constant.apiNameSpace + language +'/' + slug + '/' + searchQuery,
					dataType: 'json',
	    			cache: false,
	    			success: function(searchResponse) { 
	    				allResults.push(searchResponse);
	    				if(this.state.types.length == allResults.length) {
	    					// alert(allResults.length);
	    					for(var typeResultIndex = 0; typeResultIndex < allResults.length; typeResultIndex++) {
	    						$(allResults[typeResultIndex]).each(function(index,resultObj){
	    							resultContents.push(resultObj);
	    						});
	    					}
	    					if(resultContents.length) {
	    						this.setState({resultListContent:resultContents});
	    						var wholeHeight = $(window).height();
								var leftHeight = $(".LanguageChangerBlock").height() + $(".MainNavigation").height() + $(".SearchForm").height();
								var resultHeight = wholeHeight - leftHeight;
								$(".SearchResultList").height(resultHeight);
								$(".SearchResultList").css('padding-bottom','100px');
								$("body").css("overflow","hidden");
	    					}
	    				}
				    }.bind(this)
				})
			}
		} else {
			this.getAllPostTypeViaServer();
		}
	}
	render() {
		return (
			<div className='SearchFormResultContainer'>
				<SearchForm 
					updateFilterResult = {this.searchResultViaServer.bind(this)}
					clearFilterResult = {this.clearResults.bind(this)}
				/>
				<SearchResultList 
					results = {this.state.resultListContent}
				/>
			</div>
		);
	}
}

module.exports = SearchFormResultContainer;