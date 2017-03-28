import React, { Component } from 'react'
class Breadcrumbs extends Component {
	pageBuilderHeaderBreadcrumbFactory() {
		var breadcrumbContent = '';
		var homeLabel = helper.getTranslate('breadcrumb-home-label',helper.readCookie(helper.cookieLangKey));
		if(typeof homeLabel == 'undefined')
			return breadcrumbContent;
		breadcrumbContent += '<a href="/">' + homeLabel + '</a>';
		breadcrumbContent += '<span>' + this.props.currentTitle + '</span>';
		return breadcrumbContent;
	}
	render() {
		var breadcrumbLinkList;
		switch(this.props.position) {
			case 'pageBuilderHeader':
				breadcrumbLinkList = this.pageBuilderHeaderBreadcrumbFactory();
				break;
			default:
				breadcrumbLinkList = "Breadcrumbs";
				break;
		}
//		console.log(breadcrumbLinkList);
		return(
			<div className='Breadcrumbs pc' dangerouslySetInnerHTML={{__html:breadcrumbLinkList}} />
		);
			
	}
}
module.exports = Breadcrumbs