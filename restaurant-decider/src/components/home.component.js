import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button } from 'react-bootstrap'
import face from "../deadend.jpeg";

export default class Home extends Component {

  state = {
    location: this.props.location ? this.props.location.toString() : null,
    loading: true,
    data: null,
    restaurant: null,
    err: false,
    
  }

  async componentDidMount() {
    try {
      const data = await fetch('http://localhost:9000/api/' + this.state.location)
        .then(response => response.json());
      if (data) {
        console.log(data);
        let restaurant = data.businesses[(Math.floor(Math.random() * (data.businesses.length)))]
        this.setState({
          loading: false,
          data: data.businesses,
          restaurant: restaurant,
          err: false,
        });
      }
    } catch (err) {
      this.setState({
        loading: false,
        data: null,
        err: true,
      });
    }
  }

  async handleSub() {
    let newRestraunt = this.state.data[(Math.floor(Math.random() * (this.state.data.length)))];
    this.setState({
      loading: false,
      restaurant: newRestraunt,
      err: false,
    });
  }

  render() {
    let ret = '';

    if (this.state.loading || !this.state.location) {
      ret = <div className="text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    } else if (this.state.err) {
      ret = <div className=".bg-info text-center"><h2>Please search for a different city</h2><img src={face} className="img-fluid" alt="funny face" /></div>
    } else {
      ret = <div>
      <div className="text-center">
        <h6 className="text-muted">Today You will eat at:</h6>
        <h2>{this.state.restaurant.name}</h2>
      </div>
      <div className="bg-light text-dark mt-5">
        <Row>
          <Col>Rating: {this.state.restaurant.rating}</Col>
          <Col className="text-center">Price: {this.state.restaurant.price}</Col>
          <Col><div className="float-right">Style: {this.state.restaurant.categories[0].title}</div></Col>
        </Row>
        <div className="text-center"><img className="img-fluid" src={this.state.restaurant.image_url} alt="Restaurant" /></div>
        <Row>
          <Col>{this.state.restaurant.location.address1}, {this.state.restaurant.location.city}</Col>
          <Col><div className="float-right">{this.state.restaurant.phone}</div></Col>
        </Row>
      </div>
      <div className="text-center mt-5">
        <Button onClick={this.handleSub.bind(this)}>New Random Restaurant!</Button>
      </div>
    </div>
    }
    return (
      <Container className="mt-5">
        { ret }
      </Container>
    )
  }
}
