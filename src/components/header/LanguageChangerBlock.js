import React, { Component } from 'react';
import MenuUl from '../menu/MenuUl';
import TranslateString from '../translate-string/TranslateString';

class LanguageChangerBlock extends Component {	
	constructor(){
		super();
		this.state = {
			headerPhone:[]
		}
	}
	componentDidMount(){
		this.getBasicOptionsViaServer();
	}
	getBasicOptionsViaServer(){
		var language = helper.readCookie(helper.cookieLangKey);
		$.ajax({
			url: constant.apiNameSpace + language + constant.optionsRequest,
			success: function(options){
				this.setState({headerPhone:options.header_phone_number})
			}.bind(this)
		})
	}
	changeLanguage(event) {
		var targetLangDom = event.currentTarget;
		var targetLang = $(targetLangDom).data("language")
		var orgLanguage = helper.readCookie(helper.cookieLangKey);
		helper.defaultLanguage = targetLang;
		if(targetLang !== orgLanguage) { 
			var orgUrl = window.location.href;
			var urlItmes = orgUrl.split('/');
			var newUrl = '';
			urlItmes.map(function(item,index) {
				if(item === orgLanguage) {
					item = targetLang;
				}
				if(index != urlItmes.length - 1)
					newUrl += item + '/';
				else 
					newUrl += item;
			});
			helper.setCookie(helper.cookieLangKey,targetLang,1,'h');
			if(helper.readCookie(helper.cookieLangKey) === targetLang) {
				window.location.href = newUrl;
			} else {
				return false;
			}
		} else {
			return true;
		}
	}
	render() {
		var language = helper.readCookie(helper.cookieLangKey);
		var switcherLang  = 'en';
		var	switcherTitle = 'English';
		var registerLink = '/' + language + '/registeration/';
		if(language === 'en'){
			switcherLang  = 'zh-hans';
			switcherTitle = '简体中文';
		} 
		return (
			<div className='LanguageChangerBlock'>
				<div className="contactInfo">
					<TranslateString
                        stringKey = 'header-contact-label'
                    />
					{this.state.headerPhone}
					<a id='headerRegister' href={registerLink}>
						<TranslateString
	                        stringKey = 'header-register-label'
	                    />
					</a>
				</div>
				<div className="quickLink">
					<MenuUl 
						menuName='header-quick-link'
					/>
					<div className="languageSwitcher" data-language={switcherLang} onClick={this.changeLanguage.bind(this)}>{switcherTitle}</div>
				</div>
				<div className="clear"></div>
			</div>
		)
	}
}

module.exports = LanguageChangerBlock