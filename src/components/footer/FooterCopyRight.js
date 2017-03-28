import React, { Component } from 'react';
import FooterCopyRightNav from './FooterCopyRightNav';
class FooterCopyRight extends Component {
	constructor(){
		super();
		this.state = {
			abn:''
		}
	}
	getBasicOptionsViaServer(){
		var language = helper.readCookie(helper.cookieLangKey);
		$.ajax({
			url: constant.apiNameSpace + language + constant.optionsRequest,
			success: function(options){
				this.setState({abn:options.group_abn})
			}.bind(this)
		})
	}
	componentDidMount(){
		this.getBasicOptionsViaServer();
	}
	render() {
		return (
			<div className='FooterCopyRight'>
				<div className="container">
					<FooterCopyRightNav />
					<div className="row">
						<div className="col-md-4 col-lg-4 col-sm-12 col-xs-12">
							<p className="copyrights">Copyright 2016 GOLDMATE GROUP PTY LTD</p>
						</div>
						<div className="col-md-4 col-lg-4 col-sm-12 col-xs-12">
							<p className="copyrights">ABN <span>{this.state.abn}</span></p>
						</div>
						<div className="col-md-4 col-lg-4 col-sm-12 col-xs-12">	
							<p className="nexty">Website Designed & powered by <a href='http://www.nexty.com.au/'>Nexty</a></p>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

module.exports = FooterCopyRight