import React,{Component} from 'react';
import MobileUlLinks from './MobileUlLinks';

class MobileHeader extends Component {
	constructor(){
		super();
		this.state={
			mainMenuList:[]
		}
	}
	getMainNavViaServer(){
		var language = helper.readCookie(helper.cookieLangKey);
		$.ajax({
			url: constant.apiNameSpace + language + '/menus/mobile-menu',
			dataType:'json',
			type:'GET',
			success: function(menuReqResp){
				this.setState({mainMenuList:menuReqResp.items});
				this.render();
			}.bind(this)
		})
	}
	componentDidMount(){
		this.getMainNavViaServer();
	}
	render() {
		return(
			<header className='mobile'>
				<div className="navbar navbar-default navbar-fixed-top">
					<div className="navbar-header">
						<a className="navbar-brand" href="/">
							<img src='/assets/images/goldmate-logo.png' />
						</a>
						<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#mobile-navbar-collapse" aria-expanded="false">
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</button>
					</div>
					<div className="navbar-collapse collapse" id='mobile-navbar-collapse'>
						<MobileUlLinks
							data={this.state.mainMenuList}
						/>
					</div>
				</div>
			</header>
		);
	}
}

module.exports = MobileHeader