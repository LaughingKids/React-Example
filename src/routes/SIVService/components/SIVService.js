import React, {Component} from 'react';
import PageBuilderPages from '../../../components/page-builder-pages/PageBuilderPages';


class SIVService extends Component {
	render(){
		return (
			<div className="SIVService servicePage">
                <PageBuilderPages
                    pageName='siv-service'
                />
            </div>
		)
	}
}

module.exports = SIVService