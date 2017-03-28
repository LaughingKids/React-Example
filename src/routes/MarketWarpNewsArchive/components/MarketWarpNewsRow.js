import React, {Component} from 'react';
import TranslateString from '../../../components/translate-string/TranslateString';

class MarketWarpNewsRow extends Component {
	getPostUrl() {
		var language = helper.readCookie(helper.cookieLangKey);
		var postUrl = new Array();
		postUrl.push('');
		postUrl.push(language); /* this will change to language */
		postUrl.push(this.props.data.type);
		postUrl.push(this.props.data.slug);
		return postUrl.join('/');
	}
	render(){
		var imgUrl = helper.imageUrlFactory(this.props.data.featured_media_origin_url);
		var postUrl = this.getPostUrl();
		return (
			<div className="MarketWarpNewsRow">
				<div className="row">
					<div className="col-lg-3 col-md-3 col-xs-12 col-sm-12">
						<a className="blockLink" href={postUrl}><img className='newsRowImg' src={imgUrl} /></a>
					</div>
					<div className="col-lg-9 col-md-9 col-xs-12 col-sm-12">
						<a className="newsTitle" href={postUrl} dangerouslySetInnerHTML={{__html:this.props.data.title.rendered}} />
						<p className="newsExcerpt" dangerouslySetInnerHTML={{__html:this.props.data.excerpt.rendered}} />
						<a className="readMore" href={postUrl}>
							<TranslateString
								stringKey = 'know-more-link-label'
							/>
						</a>
					</div>
				</div>
			</div>
		)
	}
}

module.exports = MarketWarpNewsRow
