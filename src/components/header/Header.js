import React, { Component } from 'react';
import Breadcrumbs from '../breadcrumbs/Breadcrumbs';
import LanguageChangerBlock from './LanguageChangerBlock';
import MainNavigation from './MainNavigation';
import SearchFormResultContainer from '../search-form/SearchFormResultContainer';

class Header extends Component {
  render() {
    return (
      <header className="pc">
        <LanguageChangerBlock />
        <MainNavigation />
        <SearchFormResultContainer />
      </header>
    )
  }
}

module.exports = Header