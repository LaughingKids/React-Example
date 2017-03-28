import React, {Component} from 'react';
import MobileCurrencyTabsController from './MobileCurrencyTabsController';
import MobileCurrencyTabsContentBodys from './MobileCurrencyTabsContentBodys';
class MobileCurrencyTabs extends Component {
	render(){
		return(
			<div className="MobileCurrencyTabs">
				<MobileCurrencyTabsController />
				<MobileCurrencyTabsContentBodys 
					currencyData={this.props.currencyPairs}
					flagPaths={this.props.currencyLableFlags}
				/>
			</div>
		)
	}
}

module.exports = MobileCurrencyTabs