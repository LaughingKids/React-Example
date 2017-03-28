import React,{Component} from 'react';
import $ from 'jquery';
import MobileCurrencyTabsContentBodyRow from './MobileCurrencyTabsContentBodyRow';

class MobileCurrencyTabsContentBody extends Component {
	bindClickEvent(){
		$(".TabTableController .exLable .lableBtn").click();
	}
	render(){
		var contentBodyObject = this; 
		var order = 0;
		var tabTableRows = $.map(this.props.currencyData,function(data,index){
			var rowData = new Object();
			rowData.rowClass = 'odd'; 
			order ++;
			if( order % 2 == 0 ) {
				rowData.rowClass = 'even';
			}
			var key = index;
			rowData.sourceKey = data.CurrencyPair.substr(0,3);
			rowData.targetKey = data.CurrencyPair.substr(6,9);
			rowData.sourceFlagPath = contentBodyObject.props.flagPaths[rowData.sourceKey];
			rowData.targetFlagPath = contentBodyObject.props.flagPaths[rowData.targetKey];
			// console.log(contentBodyObject.props.bodyId);
			switch(contentBodyObject.props.bodyId) {
				case 'buytt': 
					rowData.exchangeValue = data.BuyTTRate[0];// * contentBodyObject.props.askMarginValue;
					break;
				case 'selltt': 
					rowData.exchangeValue = data.SellTTRate[0];// * contentBodyObject.props.bidMarginValue;;
					break;
				case 'buycach': 
					rowData.exchangeValue = data.BuyCashRate[0];// * contentBodyObject.props.sellMarginValue;;
					break;
				case 'sellcash': 
					rowData.exchangeValue = data.SellCashRate[0];// * contentBodyObject.props.buyMarginValue;;
					break;
			}
			//console.log(rowData);
			return <MobileCurrencyTabsContentBodyRow
					data = {rowData}
					key = {key}
			/>
		});
		return (
			<div className={this.props.contentBodyClass} id={this.props.bodyId}>
				{tabTableRows}
				<div className='MobileCurrencyTabsContentBodyRow'>
					<p id="innerCloseBtn"><span id='close' onClick={this.bindClickEvent}></span></p>
				</div>
			</div>
		)
	}

}

module.exports=MobileCurrencyTabsContentBody;