import React,{Component} from 'react'


class TranslateString extends Component {
	render() {
		var string = helper.getTranslate(this.props.stringKey,helper.readCookie(helper.cookieLangKey));
		switch(this.props.tag) {
			case 'p':
				return <p className={this.props.theClass}>{string}</p>;
			case 'span':
			default:
				return <span className={this.props.theClass}>{string}</span>;
		}
	}
}

module.exports = TranslateString