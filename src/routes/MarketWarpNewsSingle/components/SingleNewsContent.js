import React, {Component} from 'react';

class SingleNewsContent extends Component {
	render(){
//		console.log(this.props.data.content.rendered);
		return (
			<div className="SingleNewsContent">
				<div className="newsTitle" dangerouslySetInnerHTML={{__html: this.props.data.title.rendered}} />
				<div className="newsContent" dangerouslySetInnerHTML={{__html: this.props.data.content.rendered }} />
			</div>
		)
	}
}

module.exports = SingleNewsContent