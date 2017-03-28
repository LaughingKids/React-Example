import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import TranslateString from '../translate-string/TranslateString';
import QRCodeModal from './QRCodeModal';


class SocialLinkBlock extends Component {
	constructor(){
		super();
		this.state = {
			wechat_image:'',
			youtube_link:'',
			linkedin_link:'',
			facebook_link:'',
		}
	}
	getBasicOptionsViaServer(){
		var language = helper.readCookie(helper.cookieLangKey);
		$.ajax({
			url: constant.apiNameSpace + language + constant.optionsRequest,
			success: function(options){
				this.setState({wechat_image:options.wechat_image});
				this.setState({youtube_link:options.youtube_link});
				this.setState({linkedin_link:options.linkedin_link});
				this.setState({facebook_link:options.facebook_link});
			}.bind(this)
		})
	}
	componentDidMount(){
		this.getBasicOptionsViaServer();
	}
	render() {
		var language = helper.readCookie(helper.cookieLangKey);
		var followLable = 'Follow Us';
		var qrImgUrl = '';
		if(language != 'en')
			followLable = '关注我们';
		if(this.state.wechat_image)
			qrImgUrl = helper.imageUrlFactory(this.state.wechat_image);
		return (
			<div className='row'>
				<div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
					<div className="SocialLinkBlock">
						<div className="SocialLabel uppercase">
							{followLable}
						</div>
						<div className="SocialIcons">
							<a id='weixin' data-toggle="modal" data-target="#wechatQrCodeModal"></a>
							<a id='youtube' href={this.state.youtube_link} target='_blank'></a>
							<a id='linkedin' href={this.state.linkedin_link} target='_blank'></a>
							<a id='facebook' href={this.state.facebook_link} target='_blank'></a>
						</div>
					</div>
				</div>
				<QRCodeModal imageUrl={qrImgUrl} />
			</div>
		)	
	}
}

module.exports = SocialLinkBlock