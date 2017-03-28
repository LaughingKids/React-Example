import React,{Component} from 'react';
import $ from 'jquery';
import TranslateString from '../../../components/translate-string/TranslateString';
class RegisterationThanks extends Component {
	stepBack(event) {
		if(event)
			this.props.stepBackFunction();
	}
	render() {
		return (
			<div className="RegisterationThanks">
				<div className="container">
					<div className="row">
						<div className="col-md-offset-1 col-md-3 col-sm-6 col-xs-12">
							<div id="thanksLogo">
							</div>
							<div className="clear"/>
						</div>
						<div className="col-md-6 col-sm-6 col-xs-12">
							<div id="thanksContent">
								<TranslateString
									stringKey='thank-client-title'
									tag='p' />
								<TranslateString
									stringKey='thank-content-part-1'/>
								<span id='userSubmitService' dangerouslySetInnerHTML={{__html:this.props.serviceName}}/>
								<TranslateString
									stringKey='thank-content-part-2'/>
								<TranslateString
									stringKey='thank-content-part-3'
									tag='p'/>
							</div>
							<div id="contactDetail">
								<TranslateString stringKey="thanks-contact-detail-intro" tag='p'/>
								<p><TranslateString stringKey="location-switcher-phone-label"/>：1300 933 999</p>
								<p><TranslateString stringKey="location-switcher-email-label"/>：haymarket@goldmategroup.com</p>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-offset-5 col-md-3 col-sm-offset-6 col-sm-3 col-xs-12">
							<a id="backToHome" href='/'><TranslateString stringKey="thanks-back-to-home" /></a>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

module.exports = RegisterationThanks;