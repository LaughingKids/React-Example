import React, { Component } from 'react'
import MenuUl from '../menu/MenuUl';
class FooterNavigation extends Component {
    linkWithScrollAction(link,targetSectionId) {
        if(window.location.pathname == link) {
            $('html, body').animate({
                scrollTop: $("#"+targetSectionId).offset().top - 170
            });
        } else {
            window.location.href = link;
        }
    }
    render() {
        return (
            <div className="FooterNavigation">
                <div className='row'>
                    <div className='col-lg-3 col-md-3 col-sm-6 col-xs-12 FooterNav'>
                        <MenuUl 
                            menuName='footer-quick-links-mf'
                            linkClickFunction={this.linkWithScrollAction.bind(this)}
                        />
                    </div>
                    <div className='col-lg-3 col-md-3 col-sm-6 col-xs-12 FooterNav'>
                        <MenuUl 
                            menuName='footer-quick-links-pce'
                            linkClickFunction={this.linkWithScrollAction.bind(this)}
                        />
                    </div>
                    <div className='col-lg-3 col-md-3 col-sm-6 col-xs-12 FooterNav'>
                        <MenuUl 
                            menuName='footer-quick-links-siv'
                            linkClickFunction={this.linkWithScrollAction.bind(this)}
                        />
                    </div>
                    <div className='col-lg-3 col-md-3 col-sm-6 col-xs-12 FooterNav'>
                        <MenuUl 
                            menuName='footer-quick-links-oaa'
                            linkClickFunction={this.linkWithScrollAction.bind(this)}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 FooterFlexNav'>
                        <MenuUl 
                            menuName='footer-quick-links'
                        />
                    </div>
                </div>
            </div>
            
        )
    }
}

module.exports = FooterNavigation