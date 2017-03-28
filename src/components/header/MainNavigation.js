import React, { Component } from 'react';
import MenuUl from '../menu/MenuUl';
import FontAwesome from 'react-fontawesome';
class MainNavigation extends Component {
	showSearchForm() {
		$(".SearchFormResultContainer").fadeIn();
	}
	render() {
		return (
			<div className='MainNavigation'>
				<div className="HeaderLogo">
					<a href='/'></a>
				</div>
				<div className="MainNav">
					<MenuUl 
						menuName='main-menu'
					/>
					<div className="searchButton" onClick={this.showSearchForm.bind(this)}></div>
				</div>
				<div className="clear"></div>
			</div>
		)
	}
}

module.exports = MainNavigation