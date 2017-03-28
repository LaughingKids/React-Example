import React,{Component} from 'react';
import SearchResultList from './SearchResultList';
import TranslateString from '../translate-string/TranslateString';
import $ from 'jquery';
/**
	Two Component Communication Reference:
	http://stackoverflow.com/questions/21285923/reactjs-two-components-communicating
*/

class SearchForm extends Component {
	constructor(){
		super();
		this.state={
			searchKeyword:''
		}
	}
	handleSearchFormChangeEvent(event) {
		this.setState({searchKeyword:event.target.value});
		if(event.target.value.length) {
			this.props.clearFilterResult();
		}
	}
	handleSearchFormInputEvent(event){
		var formObj = this;
		setTimeout(function(){
			// alert(3000);
			var keyword = formObj.state.searchKeyword;
			formObj.props.updateFilterResult(keyword)
		}, 100);
	}
	closeSearchContainer(event) {
		this.setState({searchKeyword:''});
		this.props.clearFilterResult();
		$('.SearchResultList').css("padding",'0px');
		$('.SearchResultList').height(0);
		$("#searchKeyword").val("");
		$('.SearchFormResultContainer').fadeOut();
		this.render();
	}
	render(){
		return(
			<div className='SearchForm'>
				<div className="container">
					<div className="row">
						<div className="col-md-offset-2 col-md-2 col-sm-12 col-xs-12">
							<TranslateString
								theClass='SearchFormLabel'
								stringKey='search-form-label'
							/>
						</div>
						<div className="col-md-6 col-sm-12 col-xs-12">
							<input 
								type="text" 
								name='searchKeyword' 
								id='searchKeyword' 
								onChange={this.handleSearchFormChangeEvent.bind(this)}
								onKeyPress={this.handleSearchFormInputEvent.bind(this)}/>
						</div>
						<div className="col-md-2 col-sm-12 col-xs-12">
							<button id="closeTrigger" onClick={this.closeSearchContainer.bind(this)}></button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

module.exports = SearchForm;