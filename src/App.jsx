import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import Store from './services/Store';
import Home from './ui/Home';

function App() {
  return (
    <Provider store={Store}>
      <Router>
        <Container>
          <Row>
            <Col md="auto">
              <Link to="/">Home</Link>
            </Col>
            <Col md="auto">
              <Link to="/button">Button</Link>
            </Col>
            <Col md="auto">
              <Link to="/alert">Alert</Link>
            </Col>
          </Row>
          <Row>
            <Col>
              <Switch>
                <Route path="/button">
                  <Button>Hello World</Button>
                </Route>
                <Route path="/alert">
                  <Alert variant="primary">Hello World</Alert>
                </Route>
                <Route path="/">
                  <Home />
                </Route>
              </Switch>
            </Col>
          </Row>
        </Container>
      </Router>
    </Provider>
  );
}

export default App;