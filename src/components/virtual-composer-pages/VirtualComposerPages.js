import React, {Component} from 'react';
import $ from 'jquery';
import PageHeader from '../page-header/PageHeader';

class VirtualComposerPages extends Component {
	constructor() {
		super();
		this.state={
			pageContent:[],
			pageTitle:[],
			dataBack: false,
			pageHeader:[]
		}
	}
	componentDidMount(){
		this.loadPageContentViaServer();
	}
	loadPageContentViaServer(){
		var apiRequest = helper.routerPathToApiRequest(this.props.location.pathname);
		var metaQuery = "?with_meta=1";
		// console.log('/json-api/restml' + apiRequest + metaQuery);
		$.ajax({
	    	url: '/json-api/restml' + apiRequest + metaQuery,
	    	dataType: 'json',
	    	cache: false,
	    	success: function(respData) {
	    		// console.log(respData);
	    		this.setState({pageTitle:respData.title.rendered});
	    		this.setState({pageContent:respData.content.rendered});
	    		if(respData.metas.header_blocks.length != 0) {
	    			this.setState({pageHeader:respData.metas.header_blocks[0]});
	    		}
	    		this.setState({dataBack: true})
		    }.bind(this),
		    error: function(xhr, status, err) {
		        console.error(this.props.url, status, err.toString());
		    }.bind(this)
	    });
	}
	render(){
		var vcContent = '';
		if(this.state.dataBack)
			vcContent = helper.cleanTheLinks(this.state.pageContent);
		return (
			<div className="VcPages">
				<PageHeader 
					headerInfo = {this.state.pageHeader}
					pageTitle = {this.state.pageTitle}
				/>
				<div className="renderedPageContent">
					<div className="container">
						<div className="row">
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" dangerouslySetInnerHTML={{__html: vcContent}} />
						</div>
					</div>	
				</div>
			</div>
		)
	}
}

module.exports = VirtualComposerPages