
import './App.css';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { Home } from './Pages/Home';

import "./styles/Global.scss"
function App() {
  return (

    <div className="App">
      <BrowserRouter>
        <Route Path="/" component={Home} />
      </BrowserRouter>


    </div>
  )
}

export default App;
