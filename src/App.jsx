import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import Store from './services/Store';
import Home from './ui/Home';
import Libraries from './ui/Libraries';
import Redux from './ui/Redux';

function App() {
  return (
    <Provider store={Store}>
      <Router>
        <Container>
          <Row>
            <Navbar bg="light" expand="lg">
              <Nav className="mr-auto my-2 my-lg-0" style={{ maxHeight: '100px' }}>
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/libraries">Libraries</Nav.Link>
                <Nav.Link href="/redux">Redux</Nav.Link>
              </Nav>
            </Navbar>
          </Row>
          <Row>
            <Col>
              <Switch>
                <Route path="/libraries">
                  <Libraries />
                </Route>
                <Route path="/redux">
                  <Redux />
                </Route>
                <Route path="/">
                  <Home />
                </Route>
              </Switch>
            </Col>
          </Row>
        </Container>
      </Router>
    </Provider >
  );
}

export default App;