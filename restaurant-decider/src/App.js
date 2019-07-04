import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import About from './components/about.component';
import Home from './components/home.component';
import logo from "./skull.png";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
       location: null,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    this.setState({ location: 'location=' + document.getElementById('input').value });
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(position => {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      if (latitude && longitude) {
        this.setState({
          location: `latitude=${latitude}&longitude=${longitude}`
        });
      }
    });
  }

  render() {
    return (
      <Router>
        <div className="container">
          <Navbar bg="light" expand="lg">

            <Navbar.Brand>
              <a className="navbar-brand" href="/">
                <img src={logo} width="30" height="30" alt="logo" />
              </a>
              <Link to="/" className="navbar-brand">AppsByNick™</Link>
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav>
                  <Link to="/" className="nav-link float-right">Home</Link>
                </Nav>
                <Nav>
                  <Link to="/about" className="nav-link float-right">About</Link>
                </Nav>
              </Nav>


              <Form inline>
                <FormControl id="input" type="text" placeholder="City, Hood, Zip" className="mr-sm-2" />
                <Button variant="outline-success" onClick={this.handleSubmit}>Submit</Button>
              </Form>



            </Navbar.Collapse>
          </Navbar>

          <h2 className="text-center bg-light text-dark">Resturant Decision Maker</h2>



          <Route path="/" exact component={(location) => <Home location={this.state.location} />} />
          <Route path="/about" component={(location) => <About location={this.state.location} />} />
        </div>
      </Router>
    );
  }
}

export default App;