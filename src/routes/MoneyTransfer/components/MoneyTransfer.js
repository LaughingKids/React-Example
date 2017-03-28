import React, {Component} from 'react';
import PageBuilderPages from '../../../components/page-builder-pages/PageBuilderPages';
import CalculatorContainer from '../../../components/calculator/CalculatorContainer';

class MoneyTransfer extends Component {
	render(){
		return (
			<div className="MoneyTransfer servicePage">
                <PageBuilderPages
                    pageName='money-transfer' />
            </div>
		)
	}
}

module.exports = MoneyTransfer