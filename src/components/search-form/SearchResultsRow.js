import React,{Component} from 'react';
import $ from 'jquery';

class SearchResultsRow extends Component {
	resultUrlFactory(result){
		// console.log(result);
		var language = helper.readCookie(helper.cookieLangKey);
		var urlItems = new Array('',language);
		switch(result.type) {
			case 'page':
				urlItems.push(result.slug);
				return urlItems.join('/');
			default: 
				urlItems.push(result.type);
				urlItems.push(result.slug);
				return urlItems.join('/');
		}
	}
	render() {
		var resultLink = this.resultUrlFactory(this.props.data);
		var date = this.props.data.date.replace('T', ' ' );
		return (
			<div className="row">
				<div className="col-md-offset-3 col-md-8">
					<div className="SearchResultsRow">
						<a href={resultLink}>{this.props.data.title.rendered}</a>
						<p class='resultSourceLink'>{window.location.host + resultLink}</p>
						<div className='excerptParagraph'>
							<span className="postDate">{date}</span>
							<span className="postExcerpt" dangerouslySetInnerHTML={{__html:this.props.data.excerpt.rendered}} />
						</div>
					</div>
				</div>
			</div>
		)
	}
}

module.exports = SearchResultsRow;