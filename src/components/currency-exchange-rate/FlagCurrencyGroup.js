import React,{Component} from 'react'

class FlagCurrencyGroup extends Component{
	
	render() {
		var sourceImg = this.props.sourcePath;
		var targetImg = this.props.targetPath;
		return (
			<div className='FlagCurrencyGroup'>
				<img className='currencyFlag' src={sourceImg.flagPath} />
				<span className='currencyPairLabel'>{this.props.data}</span>
				<img className='currencyFlag' src={targetImg.flagPath} />
			</div>
		)
	}
}

module.exports = FlagCurrencyGroup;