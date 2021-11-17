import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import Store from './redux/Store';
import Home from './ui/Home';
import Libraries from './ui/Libraries';
import ReduxDemo from './ui/ReduxDemo';
import FormDemo from './ui/FormDemo';
import DnDDemo from './ui/DnDDemo';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  return (
    <Provider store={Store}>
      <DndProvider backend={HTML5Backend}>
        <Router>
          <Container>
            <Row>
              <Navbar bg="light" expand="lg">
                <Nav className="mr-auto my-2 my-lg-0" style={{ maxHeight: '100px' }}>
                  <Nav.Link href="/">Home</Nav.Link>
                  <Nav.Link href="/libraries">Libraries</Nav.Link>
                  <Nav.Link href="/redux-demo">Redux Demo</Nav.Link>
                  <Nav.Link href="/form-demo">Form Demo</Nav.Link>
                  <Nav.Link href="/dnd-demo">DnD Demo</Nav.Link>
                </Nav>
              </Navbar>
            </Row>
            <Row>
              <Col>
                <Switch>
                  <Route path="/libraries">
                    <Libraries />
                  </Route>
                  <Route path="/redux-demo">
                    <ReduxDemo />
                  </Route>
                  <Route path="/form-demo">
                    <FormDemo />
                  </Route>
                  <Route path="/dnd-demo">
                    <DnDDemo />
                  </Route>
                  <Route path="/">
                    <Home />
                  </Route>
                </Switch>
              </Col>
            </Row>
          </Container>
        </Router>
      </DndProvider>
    </Provider >
  );
}

export default App;