import React,{Component} from 'react'
import CurrencyExchangeTableRow from './CurrencyExchangeTableRow';
import TranslateString from '../translate-string/TranslateString';

class CurrencyExchangeTable extends Component{
	render() {
		var currencyTitle = 'Currency Pair';
		var flags = this.props.flagPath;
		var order = 0;
		var currentTableObj = this;
		var currencyExchangeTableRows = this.props.data.map(function(rowData,index){
			order++;
			rowData.rowOrderClass = 'odd';
			if(order%2 == 0) {
				rowData.rowOrderClass = 'even';
			}
			var source = rowData.pairLabel.substr(0,3);
			var target = rowData.pairLabel.substr(6,9);
			// console.log(source);
			// console.log(target);
			rowData.sourcePath = flags[source];
			rowData.targetPath = flags[target];
			return <CurrencyExchangeTableRow 
				data={rowData} 
				key={index} 
			/>
		});
		return (
			<div className="CurrencyExchangeTable">
				<div className="container">
					<div className="row">
						<div className="CurrencyExchangeTableRows">
							<div className='CurrencyExchangeTableRow'>
								<TranslateString
									tag="p"
									theClass="currencyTableTitle"
									stringKey="currency-exchange-button-label"
								/>
							</div>
							<div className='CurrencyExchangeTableRow' id="tableTitle">
								<div className="col-md-4 col-lg-4 col-sm-12 col-xs-12">
									<TranslateString
										stringKey="currency-exchange-pair-label"
									/>
								</div>
								<div className="col-md-2 col-lg-2 col-sm-12 col-xs-12">
									<TranslateString
										stringKey="currency-exchange-bid-label"
									/>
								</div>
								<div className="col-md-2 col-lg-2 col-sm-12 col-xs-12">
									<TranslateString
										stringKey="currency-exchange-ask-label"
									/>
								</div>
								<div className="col-md-2 col-lg-2 col-sm-12 col-xs-12">
									<TranslateString
										stringKey="currency-exchange-we-sell-label"
									/>
								</div>
								<div className="col-md-2 col-lg-2 col-sm-12 col-xs-12">
									<TranslateString
										stringKey="currency-exchange-we-buy-label"
									/>
								</div>
								<div className="clear" />
							</div>
							{currencyExchangeTableRows}
							<div className='CurrencyExchangeTableRow' id="tableFooter">
								<span id="close"></span>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

module.exports = CurrencyExchangeTable;