import React,{Component} from 'react';
import MenuLi from '../menu/MenuLi';

class MobileUlLinks extends Component {
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

	render(){
		var language = helper.readCookie(helper.cookieLangKey);
		var switcherLang  = 'en';
		var	switcherTitle = 'English';
		if(language === 'en'){
			switcherLang  = 'zh-hans';
			switcherTitle = '简体中文';
		} 
		var links = this.props.data.map(function(menuItem){
    		var menuItemKey = menuItem.object + '-' + menuItem.object_id;
			return (
		        <MenuLi 
		        	key={menuItemKey}
		        	itemData={menuItem}
		        />
		    );
    	});
		return(
			<ul class="nav navbar-nav">
				{links}
				<li className='MenuLi'>
					<a className="languageSwitcher" href='javascript:void(0)' data-language={switcherLang} onClick={this.changeLanguage.bind(this)}>{switcherTitle}</a>
				</li>
			</ul>
		);
	}
}

module.exports = MobileUlLinks;