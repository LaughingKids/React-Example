import React, {Component} from 'react';
import MarketWarpNewsRow from './MarketWarpNewsRow';

class MarketWarpNewsRows extends Component {
	render(){
		var newsItemsRows = this.props.postList.map(function(newItemObj,index){
			return (
				<MarketWarpNewsRow
					data = {newItemObj}
					key = {index}
				/>
			);
		});
		return (
			<div className="MarketWarpNewsRows">
				{newsItemsRows}
			</div>
		)
	}
}

module.exports = MarketWarpNewsRows
