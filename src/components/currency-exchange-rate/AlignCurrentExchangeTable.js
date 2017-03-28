import React,{Component} from 'react'
import CurrencyExchangeTable from './CurrencyExchangeTable';
import TranslateString from '../translate-string/TranslateString';

class AlignCurrentExchangeTable extends Component{
	showTable(){
		if($('.CurrencyExchangeTable').hasClass('active')){
			$('.CurrencyExchangeTable').removeClass('active');
			$('.CurrencyExchangeTable').fadeOut();
			$('.AlignCurrentExchangeTable').height(60);
		} else {
			var scrollHeight = $('div.PageHeader').height();/*$('div.Breadcrumbs').height()*/
			$('.CurrencyExchangeTable').addClass('active');
			$('.AlignCurrentExchangeTable').height(900);
			$('html, body').animate({
		    	scrollTop: scrollHeight
		    }, 1000);
			$('.CurrencyExchangeTable').fadeIn();
		}
		$('#close').click(function(){
			if($('.CurrencyExchangeTable').hasClass('active')){
				$('.CurrencyExchangeTable').removeClass('active');
				$('.CurrencyExchangeTable').fadeOut();
				$('.AlignCurrentExchangeTable').height(60);
			}
		})
	}
	render() {
		// alert('check');
		// console.log(this.props.thePath);
		var exchangeLable = 'Currency Pair';
		var alignListHtml = '';
		var results = $.map(this.props.data,function(value,index){
			var obj = {
				key: index,
				pairLabel: value.CurrencyPair,
				buytt: value.BuyTTRate[0],
				selltt: value.SellTTRate[0],
				buy: value.BuyCashRate[0],
				sell: value.SellCashRate[0],
				value: value
			};
			return obj;
		});
		// console.log(results);
		var bits = constant.tableFixedBits;
		for(var index = 0; index < 5; index++) {
			var key = results[index].pairLabel;
			var name = "<span class='name'>" + key + "</span>";
			var sellValue = parseFloat(results[index].selltt);
			var buyValue = parseFloat(results[index].buytt);
			var sell = "<span class='ask'>" + sellValue.toFixed(bits) + "</span>";
			var buy = "<span class='bid'>" + buyValue.toFixed(bits) + "</span>";
			alignListHtml += '<p class="alignListItem">' + name + sell + buy + '</p>';
		} 
		return (
			<div className="AlignCurrentExchangeTable">
				<p className="exLable">
					<TranslateString
						stringKey="currency-exchange-button-label"
					/>
					<span className="lableBtn" onClick={()=>this.showTable()}></span>
				</p>
				<div className="alignList" dangerouslySetInnerHTML={{__html:alignListHtml}} />
				<div className="clear" />
				<CurrencyExchangeTable 
					data = {results}
					flagPath = {this.props.thePath}
				/>
			</div>
		)
	}
}

module.exports = AlignCurrentExchangeTable;