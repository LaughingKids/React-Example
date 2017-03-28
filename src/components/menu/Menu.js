import React, { Component } from 'react'

class MenuUl extends Component {
	constructor(){
		super();
		this.state={
			menuData:[]
		}
	}
	loadMenuViaServer() {
		$.ajax({
			url: '/json-api/restml/zh-hans/menus/' + this.props.menuName,
			dataType:'json',
			type:'GET',
			success: function(menuReqResp){
//				console.log(menuReqResp.items);
				this.setState({menuData:menuReqResp.items});
			}.bind(this)
		})
	}
	componentDidMount(){
		this.loadMenuViaServer();
	}
    render() {
    	var menuLis = this.state.menuData.map(function(li){
    		return "<li><a href='" + li.url + "'>" + li.title + '</a></li>';
    	});
    	var liHTML = '';
    	for(var i = 0; i < menuLis.length; i++) {
    		liHTML += menuLis[i];
    	}
		return (
			<div className="MenuUl">
				<ul dangerouslySetInnerHTML={{__html:liHTML}} />
			</div>
		);
    }
}

module.exports = MenuUl