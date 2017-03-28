import React,{Component} from 'react';
import TranslateString from '../translate-string/TranslateString';

class Calculator extends Component {
	constructor(){
		super();
		this.state = {
			currencyPairs:null,
			sourceCurrency: "AUD",
			sourceAmount:constant.calculatorSourceAmount,
			reverse:false
		}
	}
	inputBuilder(type){
		var calculateRate;
		var selectContents='';
		var pairs = this.props.data;
		if(this.state.currencyPairs !== null) {
			pairs = this.state.currencyPairs;
		}
		var theCalculator = this;
		if(this.state.reverse) {
			calculateRate = 'BuyTTRate';
			if(type === 'target') {
				selectContents = "<option> AUD </option>";
			} else {
				$.map(pairs,function(currency,index){
					// console.log(currency);
					var currencyName = currency.CurrencyPair.substr(6,9);
					var dataCalculate = ' data-calculate=' + currency[calculateRate][0] + ' ';
					var dataReverse = ' data-reverse=' + currency['SellTTRate'][0] + ' ';
					var option = "<option" + dataCalculate + dataReverse + ">" + currencyName + "</option>";
					selectContents += option;
				});
			}
		} else {
			calculateRate = 'SellTTRate';
			if(type === 'source') {
				selectContents = "<option> AUD </option>";
			} else {
				$.map(pairs,function(currency,index){
					// console.log(currency);
					var currencyName = currency.CurrencyPair.substr(6,9);
					var dataCalculate = ' data-calculate=' + currency[calculateRate][0] + ' ';
					var dataReverse = ' data-reverse=' + currency['BuyTTRate'][0] + ' ';
					var option = "<option" + dataCalculate + dataReverse + ">" + currencyName + "</option>";
					selectContents += option;
				});
			}
		}
		return selectContents;
	}
	changeCurrency() {
		var baseCurrency = $('.CalculatorContainer .source .DropDownSelect select').find(":selected").val();
		var query = this.props.furtherQuery.slice(0,-3) + baseCurrency;
		$('.Calculator input#sourceAmount').val('Refreshing exchange rate...');
		$.ajax({
			url: query,
			dataType: 'json',
			cache: false,
			success: function(currencyRates){
				$('.Calculator input#sourceAmount').val('');
				this.setState({currencyPairs:currencyRates.quotes});
				this.setState({sourceCurrency:baseCurrency});
			}.bind(this)
		});
	}
	calculate() {
		// if($('.Calculator select#targetSelect').find(":selected").val() == $('.Calculator select#sourceSelect').find(":selected").val()) {
		// 	return false;
		// }
		var exchangeRate = $('.Calculator select#targetSelect').find(":selected").data('calculate');
		var reverseRate = $('.Calculator select#targetSelect').find(":selected").data('reverse');
		if(this.state.reverse)
			exchangeRate = $('.Calculator select#sourceSelect').find(":selected").data('calculator');
		var userInputAmount = $('.Calculator input#sourceAmount').val();
		if(!userInputAmount || !isFinite(userInputAmount)) {
			return false;
		}
		if(this.state.reverse) {
			inverseRateValue
		}
		var spendValue = exchangeRate * userInputAmount;
		var bits = constant.calculateFixedBits;
		var rateBits = constant.tableFixedBits;
		$('.ExchangeRateBoard #MarketRate #calculatedRate').text(parseFloat(exchangeRate).toFixed(rateBits));
		$('.ExchangeRateBoard #MarketRate #inversedRate').text(reverseRate);
		$('.ExchangeRateBoard #MarketRate').fadeIn();
		$('.Calculator input#targetAmount').val(spendValue.toFixed(bits));
	}
	inverseCalculate(){
		if(this.state.reverse) {
			this.setState({reverse:false});
		} else {
			this.setState({reverse:true});
		}
	}
	changePosition(event){
		var targetSectionId = this.props.buttonLabelLink
		$('html, body').animate({
            scrollTop: $(targetSectionId).offset().top - 170
        });
	}
	render(){
		var source = this.inputBuilder('source');
		var target = this.inputBuilder('target');
		// this.calculate();
		// console.log(this.props.buttonLabelKey);
		switch(this.props.style){
			case 'vertical':
				return(<div className="Calculator" data-style={this.props.style}/>);
			default:
				return(
					<div className="Calculator" data-style={this.props.style}>
						<div className="container">
							<div className="row">
								<div className="col-lg-offset-1 col-md-offset-1 col-lg-10 col-md-10 col-sm-12 col-xs-12">
									<div className="calculatorTitle">
										<TranslateString
											stringKey='calculator-title'
										/>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-lg-offset-1 col-md-offset-1 col-lg-5 col-md-5 col-sm-12 col-xs-12">
									<div className="InputGroup source">
										<div className="DropDownSelect">
											<select id='sourceSelect' dangerouslySetInnerHTML={{__html:source}}/>
										</div>
										<div className="AmountInput">
											<input type='text' id='sourceAmount' name='sourceAmount' onChange={this.calculate.bind(this)}/>
										</div>
									</div>
								</div>
								<div className="col-lg-5 col-md-5 col-sm-12 col-xs-12">
									<div className="InputGroup target">
										<div className="DropDownSelect">
											<select id='targetSelect' onChange={this.calculate.bind(this)} dangerouslySetInnerHTML={{__html:target}}/>
										</div>
										<div className="AmountInput">
											<input type='text' id='targetAmount' name='targetAmount' readOnly='true'/>
										</div>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-lg-offset-1 col-md-offset-1 col-lg-10 col-md-10 col-sm-12 col-xs-12">
									<div className="ExchangeRateBoard">
										<p id='MarketRate'>
											<span id='market-rate'>
												<TranslateString stringKey='calculator-market-rate-label' />
												<span id='calculatedRate'></span>
											</span>
											<span id='inverse-rate'>
												<TranslateString stringKey='calculator-inverse-label' />
												<span id='inversedRate'></span>
											</span>
										</p>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-lg-offset-1 col-md-offset-1 col-lg-10 col-md-10 col-sm-12 col-xs-12">
									<div className="controler">
										<button className='calculate' data-toggle="modal" data-target="#calculateQueryForm">
											<TranslateString
												stringKey='calculator-calbtn-label'
											/>
										</button>
										<button className='clear' onClick={this.inverseCalculate.bind(this)}>
											<TranslateString
												stringKey='calculator-inverse-btn-label'
											/>
										</button>
										<a className='clear' href="javascript:void(0);" onClick={this.changePosition.bind(this)} data-position="howitworks">
											<TranslateString
												stringKey={this.props.buttonLabelKey}
											/>
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				);
		}
		
	}
}	

module.exports = Calculator;