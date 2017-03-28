import React, {Component} from 'react';
import PageBuilderPages from '../../../components/page-builder-pages/PageBuilderPages';
import CalculatorContainer from '../../../components/calculator/CalculatorContainer';

class PhysicalCurrencyExchange extends Component {
	render(){
		return (
			<div className="PhysicalCurrencyExchange servicePage">
                <PageBuilderPages
                    pageName='physical-currency-exchange'
                />
            </div>
		)
	}
}

module.exports = PhysicalCurrencyExchange