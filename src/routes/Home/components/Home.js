import React, { Component } from 'react'

class Home extends Component {
  render() {
    return (
      <div className="container home">
        <h2>Home</h2>
        <p>
          Open the network tab as you navigate. Notice that only the amount of
          your app that is required is actually downloaded as you navigate
          around. Even the route configuration objects are loaded on the fly.
          This way, a new route added deep in your app will not affect the
          initial bundle of your application.
        </p>
      </div>
    )
  }
}

module.exports = Home