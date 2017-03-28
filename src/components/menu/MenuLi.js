import React, { Component } from 'react'

class MenuLi extends Component {
	constructor(){
		super();
		this.state={
			linkTarget:[]
		}
	}
	frontEndUrlFactory(){
		var language = helper.readCookie(helper.cookieLangKey);
		var linkItems = this.props.itemData.url.split('/');
		switch(this.props.itemData.object){
			case 'page':
				if(language !== 'zh-hans') {
					linkItems.shift(); /* http: */
					linkItems[1]=language; /* backend host */
					return linkItems.join('/');
				} else {
					linkItems.shift(); /* http: */
					linkItems.shift(); /* http: */
					linkItems.shift(); /* http: */
					linkItems.unshift(""); /* http: */
					return linkItems.join('/');
				}
				
			case 'custom':
				if(this.props.onClickAction != null) {
					return 'javascript:void(0);';
				}
				return this.props.itemData.url;
			default:
				return '/';
		}
	}
	getClickActionPara(){
		if( this.props.itemData.object == 'custom' &&
			this.props.onClickAction != null ) {
			var linkItems = this.props.itemData.url.split('#');
			return linkItems;
		} else {
			return new Array();
		}
	} 
	handleOnClickEvent(event){
		var link = $(event.target).data('location');
		var targetId = $(event.target).data('target');
		this.props.onClickAction(link,targetId);
	}
    render() {
    	var link = this.frontEndUrlFactory();
    	var actionParameters = this.getClickActionPara();
    	if(actionParameters.length == 2) {
    		return (
				<li className='MenuLi'>
					<a className='MenuLink' href={link}  onClick={this.handleOnClickEvent.bind(this)} data-target={actionParameters[1]} data-location={actionParameters[0]}>{this.props.itemData.title}</a>
				</li>
			);
    	}
    	return (
			<li className='MenuLi'>
				<a className='MenuLink' href={link} target={this.state.target}>{this.props.itemData.title}</a>
			</li>
		);
    }
}


// class MenuLi extends Component {
// 	constructor(){
// 		super();
// 		this.state={
// 			linkTarget:'',
// 			actionTarget:''
// 		}
// 	}
// 	handleOnClickEvent(link,targetId){
// 		console.log(link);
// 		console.log(targetId);
// 		this.props.onClickAction(link,targetId);
// 	}
// 	frontEndUrlFactory(){
// 		var language = helper.readCookie(helper.cookieLangKey);
// 		var linkItems = this.props.itemData.url.split('/');
// 		switch(this.props.itemData.object){
// 			case 'page':
// 				if(language !== 'zh-hans') {
// 					linkItems.shift(); /* http: */
// 					linkItems[1]=language; /* backend host */
// 				} else {
// 					linkItems.shift(); /* http: */
// 					linkItems.shift(); /* http: */
// 					linkItems.shift(); /* http: */
// 					linkItems.unshift(""); /* http: */
// 				}
// 				var theLink = linkItems.join('/');
// 				this.setState({linkTarget:theLink});
// 			case 'custom':
// 				var linkItems = this.props.itemData.url.split('#');
// 				if(this.props.onClickAction != null && linkItems[1] != null){
// 					this.setState({actionTarget:linkItems[1]})
// 					this.setState({linkTarget:linkItems[0]});
// 				}
// 				this.setState({linkTarget:this.props.itemData.url});
// 			default:
// 				this.setState({linkTarget:'/'});
// 		}
// 	}
// 	componentDidMount(){
// 		this.frontEndUrlFactory();
// 	}
//     render() {
//     	console.log(this.props.onClickAction);
//     	if(this.props.onClickAction != null) {
//     		return (
// 				<li className='MenuLi'>
// 					<a className='MenuLink' onClick={this.handleOnClickEvent(this.state.linkTarget,this.state.actionTarget)}>{this.props.itemData.title}</a>
// 				</li>
// 			);
//     	} else {
//     		return (
// 				<li className='MenuLi'>
// 					<a className='MenuLink' href={this.state.linkTarget}>{this.props.itemData.title}</a>
// 				</li>
// 			);
//     	}
    	
//     }
// }

module.exports = MenuLi
