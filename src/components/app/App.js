import React, {Component} from 'react';
import Home from '../home/Home';
import Header from '../header/Header';
import MobileHeader from '../mobile-header/MobileHeader';
import Footer from '../footer/Footer';
import $ from 'jquery';
/**
 * language control can use app state to change and 
 * bind target function to modify each component 
 * state and re-render them 
 **/

class App extends Component {
	render(){
		let {children} = this.props;
		var componentClass,templateContent,componentId;
		if(children) {
			componentClass = "Children";
			templateContent = children;
		} else {
			componentClass = "Home";
			templateContent = <Home />;
		}
		return (
			<div className="PageRoot">
				<Header />
				<MobileHeader />
				<div className = {componentClass}>
					{templateContent}
				</div>
				<Footer />
			</div>
		)
	}
}

module.exports = App