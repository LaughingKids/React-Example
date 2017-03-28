import React,{Component} from 'react';

class MobileCurrencyTabsContentBodyRow extends Component {
	render(){
		var erValueLabel = this.props.data.sourceKey + '/' + this.props.data.targetKey;
		var classRow = 'MobileCurrencyTabsContentBodyRow ' + this.props.data.rowClass; 
		var bits = constant.tableFixedBits;
		return (
			<div className={classRow}>
				<div className="col-sm-6 col-xs-8">
					<img className='flagImage' src={this.props.data.sourceFlagPath.flagPath} />
					<span className='erValueLabel'> {erValueLabel}</span>
					<img className='flagImage' src={this.props.data.targetFlagPath.flagPath} />
				</div>
				<div className="col-sm-6 col-xs-4"><span class='erValue bid'>{this.props.data.exchangeValue}</span></div>
				<div className="clear" />
			</div>
		)
	}
}

module.exports = MobileCurrencyTabsContentBodyRow;