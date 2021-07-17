import './App.css';
import { Provider } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Store from './services/Store';

function App() {
  return (
    <Provider store={Store}>
      <div>
        <Button variant="primary">Hello World</Button>
      </div>
    </Provider>
  );
}

export default App;