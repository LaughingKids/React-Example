import React,{Component} from 'react';
import $ from 'jquery';
import SearchResultsRow from './SearchResultsRow';

class SearchResultList extends Component {
	render(){
		var resultRows = this.props.results.map(function(theResult,index){
			return (
				<SearchResultsRow data={theResult} key={index}/>
			);
		});
		var componentClassName = 'SearchResultList ';
		if(this.props.results.length == 0) {
			componentClassName += 'empty';
		}
		return(
			<div className={componentClassName}>
				<div className="container">
					{resultRows}
				</div>
			</div>
		);
	}
}

module.exports = SearchResultList;