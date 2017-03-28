import React, { Component } from 'react'
import LocationMap from '../LocationMap/LocationMap';
import PageBuilderPages from '../page-builder-pages/PageBuilderPages';
import CurrencyExchangeRate from '../currency-exchange-rate/CurrencyExchangeRate';

class Home extends Component {
    render() {
        return (
            <div className="Home">
                <PageBuilderPages
                    pageName='home'
                />
            </div>
        )
    }
}

module.exports = Home