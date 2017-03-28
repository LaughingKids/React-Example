import React,{Component} from 'react';
import TranslateString from '../translate-string/TranslateString';
class MobileCurrencyTabsController extends Component {
	render(){
		return (
			<div className="MobileCurrencyTabsController">
				<ul className="nav nav-pills">
					<li className="active">
						<a data-toggle="tab" href="#sellcash">
							<TranslateString stringKey="currency-exchange-bid-label" />
						</a>
					</li>
					<li>
						<a data-toggle="tab" href="#buycach">
							<TranslateString stringKey="currency-exchange-ask-label" />
						</a>
					</li>
					<li>
						<a data-toggle="tab" href="#selltt">
							<TranslateString stringKey="currency-exchange-we-sell-label" />
						</a>
					</li>
					<li>
						<a data-toggle="tab" href="#buytt">
							<TranslateString stringKey="currency-exchange-we-buy-label" />
						</a>
					</li>
				</ul>
				<div className='clear' />
			</div>
		)
	}
}

module.exports = MobileCurrencyTabsController;