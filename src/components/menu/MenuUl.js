import React, { Component } from 'react'
import MenuLi from './MenuLi';

class MenuUl extends Component {
	constructor(){
		super();
		this.state={
			menuData:[]
		}
	}
	loadMenuViaServer() {
		var language = helper.readCookie(helper.cookieLangKey);
		// console.log(constant.apiNameSpace + language + '/menus/' + this.props.menuName);
		$.ajax({
			url: constant.apiNameSpace + language + '/menus/' + this.props.menuName,
			dataType:'json',
			type:'GET',
			success: function(menuReqResp){
				this.setState({menuData:menuReqResp.items});
			}.bind(this)
		})
	}
	componentDidMount(){
		this.loadMenuViaServer();
	}
    render() {
    	var currentMenuUlObj = this;
    	var menuLis = this.state.menuData.map(function(menuItem){
    		var menuItemKey = menuItem.object + '-' + menuItem.object_id;
    		if(currentMenuUlObj.props.linkClickFunction != null) {
    			return (
			        <MenuLi 
			        	key={menuItemKey}
			        	itemData={menuItem}
			        	onClickAction={currentMenuUlObj.props.linkClickFunction.bind(currentMenuUlObj)}
			        />
			    );
    		} else {
    			return (
			        <MenuLi 
			        	key={menuItemKey}
			        	itemData={menuItem}
			        />
			    );
    		}
    		
    	});
    	var otherItmes = '';
		return (
			<ul className="MenuUl">
				{menuLis}
				{otherItmes}
			</ul>
		);
    }
}

module.exports = MenuUl