import React, { Component } from 'react';
import MenuUl from '../menu/MenuUl';
import TranslateString from '../translate-string/TranslateString';
class FooterCopyRightNav extends Component {
  render() {
    return (
		<div className='FooterCopyRightNav'>
			<div className="row">
				<MenuUl 
					menuName='footer-others-page'
				/>
				<a className="groupLink" href='http://www.goldmate.com.au'>
					<TranslateString stringKey="group-link-label" />
				</a>
			</div>
		</div>
    )
  }
}

module.exports = FooterCopyRightNav