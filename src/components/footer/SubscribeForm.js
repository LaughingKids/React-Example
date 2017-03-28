import React, { Component } from 'react';
import ContactForm from '../contactform/ContactForm';
class SubscribeForm extends Component {
  render() {
    var language = helper.readCookie(helper.cookieLangKey);
  	var subscribeFormId = 59;
    if(language === 'zh-hans') {
        subscribeFormId = 60;
    }
    return (
      <div className='row'>
      	<div className = "col-md-8 col-lg-8 col-sm-12 col-xs-12">
      		<div className="SubscribeForm">
      			 <ContactForm 
		        	id={subscribeFormId}
		        	name="subscribe"/>
      		</div>
      	</div>
      </div>
    )
  }
}

module.exports = SubscribeForm