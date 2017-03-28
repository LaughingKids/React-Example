import React, {Component} from 'react';
import PageBuilderPages from '../../../components/page-builder-pages/PageBuilderPages';

class AboutUsPage extends Component {
	render(){
		return (
	     	<div className="AboutUsPage">
	     		<PageBuilderPages
                    pageName='about-us'
                />
	     	</div>
	    )
	}
}

module.exports = AboutUsPage