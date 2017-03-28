import React, {Component} from 'react';
import SingleNewsContent from './SingleNewsContent';

class MarketWarpNewsSingle extends Component {
	constructor() {
		super();
		this.state={
			newsSingleData:[]
		}
	}
	componentDidMount(){
		this.loadPageContentAndMetaViaServer();
	}
	loadPageContentAndMetaViaServer(){
		var apiRequest = this.props.location.pathname.slice(1);
//		console.log(constant.apiNameSpace + apiRequest);
		$.ajax({
	    	url: constant.apiNameSpace + apiRequest,
	    	dataType: 'json',
	    	cache: false,
	    	success: function(respData) {
//				console.log(respData);
	    		this.setState({newsSingleData:respData});
		    }.bind(this),
		    error: function(xhr, status, err) {
		        console.error(this.props.url, status, err.toString());
		    }.bind(this)
	    });
	}
	render(){
		if(this.state.newsSingleData.length == 0) {
			return (
				<div className="container"></div>
			);
		} else {
			return (
				<div className="MarketWarpNewsSingle">
					<div className="container">
						<div className="row">
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
								<SingleNewsContent
									data = {this.state.newsSingleData}
								/>
							</div>
						</div>
					</div>
				</div>
			)
		}
	}
}

module.exports = MarketWarpNewsSingle