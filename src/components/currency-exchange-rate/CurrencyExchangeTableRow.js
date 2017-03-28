import React,{Component} from 'react'
import FlagCurrencyGroup from './FlagCurrencyGroup'

class CurrencyExchangeTableRow extends Component{
	render() {
		var currencyTitle = 'Currency Pair';
		var pairLabel = this.props.data.pairLabel;
		var bits = constant.tableFixedBits;
		// console.log(this.props.data);
		if(this.props.data.Name !== 'N/A'){
			var rowClass = this.props.data.rowOrderClass + ' CurrencyExchangeTableRow';
			return (
				<div className={rowClass}>
					<div className="col-md-4 col-lg-4 col-sm-12 col-xs-12">
						<FlagCurrencyGroup data={pairLabel} sourcePath={this.props.data.sourcePath} targetPath={this.props.data.targetPath}/>
					</div>
					<div className="col-md-2 col-lg-2 col-sm-12 col-xs-12"><span class='erValue sell'>{this.props.data.sell}</span></div>
					<div className="col-md-2 col-lg-2 col-sm-12 col-xs-12"><span class='erValue buy'>{this.props.data.buy}</span></div>
					<div className="col-md-2 col-lg-2 col-sm-12 col-xs-12"><span class='erValue selltt'>{this.props.data.selltt}</span></div>
					<div className="col-md-2 col-lg-2 col-sm-12 col-xs-12"><span class='erValue buytt'>{this.props.data.buytt}</span></div>
					<div className="clear" />
				</div>
			)
		} else {
			return(<div className='CurrencyExchangeTableRow' id="close"> </div>);
		}
		
	}
}

module.exports=CurrencyExchangeTableRow;