import React,{Component} from 'react';
import TranslateString from '../../../components/translate-string/TranslateString';


class RegisterationSamplesHeader extends Component {
	colFactory(){
		// console.log(this.props.theItems);
		var selectedItems = this.props.theItems.split('-');
		var colSize = 12 / selectedItems.length;
		var colClass = 'col-md-'+ colSize + ' col-sm-12 col-xs-12';
		if(selectedItems.length > 2) {
			var temp = selectedItems[2];
			selectedItems[2] = selectedItems[1];
			selectedItems[1] = temp;
		} else {
			this.props.options.pop();
		}
		var headerImages = new Array();
		this.props.options.map(function(object,index) {
			var theItem = selectedItems[index];
			var theItemObj;
			for(var i = 0; i < object.option_items.length; i++) {
				if(object.option_items[i].item_value == theItem) {
					theItemObj = object.option_items[i];
				}
			}
			var key = object.options_key;
			var image = new Object();
			image.type = object.options_key;
			image.url = theItemObj.selected_logo.url;
			headerImages[index] = image;
		});
		var content = '';
		$(headerImages).map(function(index,image){
			var subContent = '<div class="'+colClass+'" id="'+image.type+'">';
			subContent += '<div class="imageHolder">';
			subContent += '<img src="'+image.url+'" />';
			subContent += '<div class="clear"></div>';
			subContent += '</div>';
			subContent += '<div class="clear"></div>';
			subContent += '</div>';
			content += subContent;
		})
		content += '<div class="clear"></div>';
		return content;
	}
	render(){
		var innerContent = this.colFactory();
		return (
			<div className="RegisterationSamplesHeader">
				<div className="container">
					<div className="row">
						<div className="col-md-offset-2 col-md-8 col-sm-12 col-xs-12" dangerouslySetInnerHTML={{__html:innerContent}} />
					</div> 
					<div className="row">
						<div className="col-md-offset-2 col-md-8 col-sm-12 col-xs-12" id>
							<TranslateString
								stringKey="register-form-title"
								tag="p"
								theClass="formListTitle"
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

module.exports = RegisterationSamplesHeader;