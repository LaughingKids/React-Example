import React,{Component} from 'react';
import MobileCurrencyTabsContentBody from './MobileCurrencyTabsContentBody';

class MobileCurrencyTabsContentBodys extends Component {
	render(){
		var contentBodyIds = new Array('sellcash','buycach','selltt','buytt');
		var contentBodysObject = this;
		var contentBodys = $.map(contentBodyIds,function(bodyId,index){
			var contentBodyClass = 'tab-pane fade ';
			if(bodyId === 'sellcash')
				contentBodyClass += 'in active';
			return <MobileCurrencyTabsContentBody 
						bodyId={bodyId}
						currencyData={contentBodysObject.props.currencyData}
						flagPaths={contentBodysObject.props.flagPaths}
						contentBodyClass={contentBodyClass}
						key={bodyId}
					/>
		});
		return(
			<div className='MobileCurrencyTabsContentBodys tab-content'>
				{contentBodys}
			</div>
		);
	}
}

module.exports=MobileCurrencyTabsContentBodys