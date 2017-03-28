import React, {Component} from 'react';
import MarketWarpNewsRows from './MarketWarpNewsRows';
import TranslateString from '../../../components/translate-string/TranslateString';
import FontAwesome from 'react-fontawesome'

class MarketWarpNewsArchive extends Component {
	constructor() {
		super();
		this.state={
			newsListData:[],
			currentPage: 1,
			hasNext: true,
			catFilter: '',
		}
	}
	declearObject(taxonomySlug) {
		this.state = {
			newsListData:[],
			currentPage: 1,
			hasNext: true,
			catFilter: taxonomySlug,
		}
	}
	getNextPage(){
		// alert(this.state.currentPage);
		var nextPage = this.state.currentPage + 1;
		this.setState({currentPage:nextPage});
		this.loadNewsViaServer(nextPage);
	}
	componentDidMount(){
		this.loadNewsViaServer(null,null);
	}
	loadNewsViaServer(nextPage,taxonomySlug){
		// alert(taxonomySlug);
		/* delete '/' at first, because const of apiNamespace equals to /json-api/restml/ */
		var apiRequest = this.props.location.pathname.slice(1);
		var metaQuery = '?filter[posts_per_page]=' + constant.listCount + '&filter[paged]=' + this.state.currentPage;
		if($(nextPage).length != 0) {
			metaQuery = '?filter[posts_per_page]=' + constant.listCount + '&filter[paged]=' + nextPage;
		}
		var catQuery = catQuery = '&filter[taxonomy]=goldmate-market-wrap-category&filter[term]=' + this.state.catFilter;
		if(taxonomySlug != null)
			catQuery = '&filter[taxonomy]=goldmate-market-wrap-category&filter[term]=' + taxonomySlug;
		$.ajax({
	    	url: constant.apiNameSpace + apiRequest + metaQuery + catQuery,
	    	dataType: 'json',
	    	cache: false,
	    	success: function(respData) {
	    		// alert( constant.apiNameSpace + apiRequest + metaQuery + catQuery);
	    		if(respData.length != 0) {
	    			var wholeList = this.state.newsListData;
	    			for(var index=0; index<respData.length; index++){
	    				wholeList.push(respData[index]);
	    			}
	    			this.setState({newsListData:wholeList});
	    		} else {
	    			$(".no_more_news").fadeIn();
	    			setTimeout(function(){$(".no_more_news").fadeOut();}, 4000);
	    			this.setState({hasNext:false});
	    		}

		    }.bind(this),
		    error: function(xhr, status, err) {
		        console.error(this.props.url, status, err.toString());
		    }.bind(this)
	    });
	}
	hanlderFilterAction(event) {
		$('.newsFilter span').removeClass('active');
		$(event.target).addClass('active');
        var projects = new Array();
        var taxonomySlug = $(event.currentTarget).data('target-tax');
        this.declearObject(taxonomySlug);
        this.loadNewsViaServer(1,taxonomySlug);
    }
	shouldComponentUpdate(nextProps, nextState) {
		return nextState.hasNext;
	}
	render(){
		/* after list content loaded display the page */
//		helper.displayContents();
		return (
			<div className="MarketWarpNewsArchive">
				<div className="container">
					<div className="FilterController">
						<div className="row">
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
								<button className="newsFilter" data-target-tax='' onClick={this.hanlderFilterAction.bind(this)}>
	                            	<TranslateString stringKey="market-wrap-all-label" />
	                            </button>
	                            <button className="newsFilter" data-target-tax='market-wrap' onClick={this.hanlderFilterAction.bind(this)}>
	                            	<TranslateString stringKey="market-wrap-label" />
	                            </button>
	                            <button className="newsFilter" data-target-tax='industry-news' onClick={this.hanlderFilterAction.bind(this)}>
	                            	<TranslateString stringKey="industry-news-label" />
	                            
	                            </button>
	                            <button className="newsFilter" data-target-tax='company-news' onClick={this.hanlderFilterAction.bind(this)}>
	                            	<TranslateString stringKey="company-news-label" />
	                            </button>
	                        </div>
						</div>
					</div>
					<MarketWarpNewsRows 
						postList = {this.state.newsListData}
					/>
					<div className="newsLoader">
						<button id="loadMore" onClick={()=>this.getNextPage()}>
							<TranslateString
								stringKey = 'news-archive-load-more'
							/>
						</button>
					</div>
				</div>
			</div>
		)
	}
}

module.exports = MarketWarpNewsArchive
