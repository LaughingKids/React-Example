import React,{Component} from 'react';
import $ from 'jquery';
import RegisterationSelectorBlock from './RegisterationSelectorBlock';

class RegisterationSelectorRow extends Component {
	render(){
		var rowObject = this;
		var selectorBlocks = this.props.data.option_items.map(function(selectorItem,index){
			return (
				<RegisterationSelectorBlock
					data = {selectorItem}
					clickFunction={rowObject.props.selectorClickFunction.bind(rowObject)}
					itemType={rowObject.props.data.options_key}
					key={index}
				/>
			)
		});
		return (
			<div className="row"  id={this.props.data.options_key}>
				<p className="optionType">{this.props.data.option_order}.{this.props.data.selector_lable}</p>
				<div className="col-md-offset-3 col-md-6 col-sm-12 col-xs-12">
					{selectorBlocks}
				</div>
			</div>
		)
	}
}

module.exports = RegisterationSelectorRow;