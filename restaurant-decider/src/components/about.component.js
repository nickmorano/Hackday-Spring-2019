import React, { Component } from 'react';

export default class About extends Component {
  state = {
    location: this.props.location ? this.props.location.toString() : null,    
  }

  render() {
    return(
        <h4>{this.state.location ? this.state.location.split('location=') : 'Hello'}</h4>
    );
  }
}