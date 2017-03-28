import React, { Component } from 'react'
import SubscribeForm from './SubscribeForm';
import SocialLinkBlock from './SocialLinkBlock';
import FooterNavigation from './FooterNavigation';
import FooterCopyRight from './FooterCopyRight';
class Footer extends Component {
  render() {
    return (
      <footer>
          <div className="container">
              <SubscribeForm />
              <SocialLinkBlock />
              <FooterNavigation />
          </div>
          <FooterCopyRight />
      </footer>
    )
  }
}

module.exports = Footer